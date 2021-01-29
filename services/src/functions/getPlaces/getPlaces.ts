import type { Request, Response } from 'express';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { GOOGLE_APPLICATION_CREDENTIALS, PROJECT_ID } from '../../config';

const db = new Firestore({
  keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
  projectId: PROJECT_ID,
});

admin.initializeApp({
  projectId: PROJECT_ID,
});

async function getPlaces(req: Request, res: Response) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    return res.status(204).send('');
  }

  if (req.url !== '/places') {
    return res.status(404).json({ error: 'not found' });
  }

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'bad request' });
  }

  if (!req.headers.authorization) {
    return res.status(400).json({ error: 'bad request' });
  }

  const placesRef = db.collection('places');
  const authToken = req.headers.authorization?.split('Bearer ')[1];

  try {
    const { uid } = await admin.auth().verifyIdToken(authToken);
    const snapshot = await placesRef.where('user', '==', uid).get();
    let places: any[] = [];
    snapshot.forEach((doc) => places.push(doc.data()));

    return res.json({ data: places });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
}

export default getPlaces;
