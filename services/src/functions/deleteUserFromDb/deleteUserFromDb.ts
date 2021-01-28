import { Firestore } from '@google-cloud/firestore';
import { UserRecord } from './deleUserFromDb';

const db = new Firestore();

async function deleteUserFromDb(event: UserRecord) {
  try {
    const userRef = db.collection('users').doc(event.uid);
    const user = await userRef.get();

    if (user.exists) {
      await userRef.delete();
    } else {
      throw new Error('no such user in db');
    }
    console.log(`successfully deleted user ${event.uid}`);
  } catch (error) {
    console.error(error);
  }
}

export default deleteUserFromDb;
