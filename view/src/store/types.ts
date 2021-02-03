/* AUTH TYPES*/

export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export interface AuthState {
  user: AuthedUser | null;
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  error: null | string;
}

export interface AuthedUser {
  email: string;
  uid: string;
  first_name: string;
  last_name: string;
  authToken: string;
}

export interface LoginUserStartAction {
  type: typeof LOGIN_USER_START;
}

export interface LoginUserSuccessAction {
  type: typeof LOGIN_USER_SUCCESS;
  payload: AuthedUser;
}

export interface LoginUserFailedAction {
  type: typeof LOGIN_USER_FAILED;
  payload: { error: string };
}

export interface SignUpUserAction {
  type: typeof SIGN_UP_USER;
  payload: AuthedUser;
}

export interface LogoutUserAction {
  type: typeof LOGOUT_USER;
}

export type AuthActionTypes =
  | LoginUserStartAction
  | LoginUserSuccessAction
  | LoginUserFailedAction
  | SignUpUserAction
  | LogoutUserAction;

/* POKEMON TYPES */

export interface Pokemon {
  id: number;
  image_url: string;
  name: string;
  types: string[];
}

/* FAVORITE TYPES */

export const GET_FAVORITES_START = 'GET_FAVORITES_START';
export const GET_FAVORITES_SUCCESS = 'GET_FAVORITES_SUCCESS';
export const GET_FAVORITES_FAILED = 'GET_FAVORITES_FAILED';

export const ADD_FAVORITE = 'ADD_FAVORITE';

export interface Favorite extends Pokemon {
  uid: string;
}

export type Favorites = Favorite[];

export interface GetFavoritesStartAction {
  type: typeof GET_FAVORITES_START;
}

export interface GetFavoritesSuccessAction {
  type: typeof GET_FAVORITES_SUCCESS;
  payload: Favorites;
}

export interface GetFavoritesFailedAction {
  type: typeof GET_FAVORITES_FAILED;
  payload: { error: string };
}

export interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: { pokemon: Pokemon; uid: string };
}

export type FavoritesActionTypes =
  | GetFavoritesStartAction
  | GetFavoritesSuccessAction
  | GetFavoritesFailedAction
  | AddFavoriteAction;
