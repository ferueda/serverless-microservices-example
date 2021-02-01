import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Pokemon } from '../types/IPokemon';
import { IUserData, IDbUser, AuthedUser } from '../types/IUser';
import { firebaseConfig } from '../utils/config';
import { postNewUserToDb } from './api';

firebase.initializeApp(firebaseConfig);

export async function signUpNewUserWithEmailAndPassword(userData: IUserData): Promise<AuthedUser> {
  const { email, password, first_name, last_name } = userData;
  const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

  if (!user) throw new Error('an error ocurrer while signgn up');

  const authToken = await user.getIdToken();
  const postedUser = await postNewUserToDb({ email, first_name, last_name, uid: user.uid });
  return { authToken, ...postedUser };
}

export async function getUserFromDb(uid: string): Promise<IDbUser> {
  return (await firebase.firestore().collection('users').doc(uid).get()).data() as IDbUser;
}

export async function logInWithEmailAndPassowrd(
  email: string,
  password: string,
): Promise<AuthedUser> {
  const userCredentials: firebase.auth.UserCredential = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  if (!userCredentials.user) {
    throw new Error('no such user');
  }

  const authToken = await userCredentials.user.getIdToken();
  const userUid: string = userCredentials.user.uid;
  const userFromDb: IDbUser = await getUserFromDb(userUid);

  if (!userFromDb) {
    throw new Error('no such user');
  }

  return {
    uid: userUid,
    authToken,
    ...userFromDb,
  };
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

export async function getFavorites(uid: string) {
  return await firebase.firestore().collection('favorites').where('uid', '==', uid).get();
}

export async function addFavorite(pokemon: Pokemon, uid: string) {
  return await firebase
    .firestore()
    .collection('favorites')
    .add({ uid, ...pokemon });
}

export async function removeFavorite(pokemonId: string, uid: string) {
  const favoriteSnapshots = await firebase
    .firestore()
    .collection('favorites')
    .where('uid', '==', uid)
    .where('id', '==', Number(pokemonId))
    .get();

  favoriteSnapshots.forEach((favorite) => favorite.ref.delete());
}

export default firebase;
