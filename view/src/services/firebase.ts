import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { IUserData, IUser, IDbUser } from '../types/IUser';
import { firebaseConfig } from '../utils/config';
import { postNewUserToDb } from './api';

firebase.initializeApp(firebaseConfig);

export async function signUpNewUserWithEmailAndPassword(userData: IUserData): Promise<IUser> {
  const { email, password, first_name, last_name } = userData;
  const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

  if (!user) throw new Error('an error ocurrer while signgn up');

  const postedUser = await postNewUserToDb({ email, first_name, last_name, uid: user.uid });
  return postedUser;
}

export async function getUserFromDb(uid: string): Promise<IDbUser> {
  return (await firebase.firestore().collection('users').doc(uid).get()).data() as IDbUser;
}
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
