import {Request, Response} from 'express';
import {Firestore} from '@google-cloud/firestore';
import {GOOGLE_APPLICATION_CREDENTIALS, PROJECT_ID} from '../../config';

import {User, RequestBody} from './IsignUp';

const db = new Firestore({
  keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
  projectId: PROJECT_ID,
});

async function signUp(req: Request, res: Response) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).send('');
  }

  if (req.url !== '/') {
    return res.status(404).json({error: 'not found'});
  }

  if (req.method !== 'POST') {
    return res.status(400).json({error: 'bad request'});
  }

  const body: RequestBody = req.body;

  if (!body.uid || !body.email || !body.first_name || !body.last_name) {
    return res.status(400).json({error: 'bad request'});
  }

  const userData: User = {
    email: body.email,
    first_name: body.first_name,
    last_name: body.last_name,
  };

  try {
    const isUser = await db.collection('users').doc(body.uid).get();

    if (isUser.exists) {
      return res.status(400).json({error: 'user already exists'});
    }

    await db.collection('users').doc(body.uid).set(userData);
    const addedUser = (await db.collection('users').doc(body.uid).get()).data();

    return res.json({...addedUser, uid: body.uid});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'something went wrong'});
  }
}

export default signUp;
