import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../utils/config';

firebase.initializeApp(firebaseConfig);

export async function signUpNewUserWithEmailAndPassword(
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function getCurrentUser(): firebase.User | null {
  return firebase.auth().currentUser;
}

export async function deleteUser(user: firebase.User) {
  return await user.delete();
}

export default firebase;
