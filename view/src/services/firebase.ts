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

export async function logInWithEmailAndPassowrd(
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export function getCurrentUser(): firebase.User | null {
  return firebase.auth().currentUser;
}

export async function logOutCurrentUser(): Promise<void> {
  return await firebase.auth().signOut();
}

export async function deleteUser(user: firebase.User): Promise<void> {
  return await user.delete();
}

export default firebase;
