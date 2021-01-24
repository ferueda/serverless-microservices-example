import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../utils/config';

firebase.initializeApp(firebaseConfig);

export async function signUpNewUserWithEmailAndPassword(email: string, password: string) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
}

export default firebase;
