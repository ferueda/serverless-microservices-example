import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../utils/config';

firebase.initializeApp(firebaseConfig);

export async function signUpNewUserWithEmailAndPassword(userData: IUserData): Promise<IUser> {
  const { email, password, first_name, last_name } = userData;
  const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

  if (!user) throw new Error('an error ocurrer while signgn up');

  const postedUser = await postNewUserToDb({ email, first_name, last_name, uid: user.uid });
  return postedUser;
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
