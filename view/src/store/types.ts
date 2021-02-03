/* AUTH TYPES*/

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

type Status = 'idle' | 'pending' | 'resolved' | 'rejected';

export interface AuthState {
  user: AuthedUser | null;
  status: Status;
  error: null | string;
}

export interface AuthedUser {
  email: string;
  uid: string;
  first_name: string;
  last_name: string;
  authToken: string;
}

export interface AuthUserRequestAction {
  type: typeof AUTH_REQUEST;
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
  | AuthUserRequestAction
  | LoginUserSuccessAction
  | LoginUserFailedAction
  | SignUpUserAction
  | LogoutUserAction;

/* POKEMON TYPES */

export const GET_POKEMONS_START = 'GET_POKEMONS_START';
export const GET_POKEMONS_SUCCESS = 'GET_POKEMONS_SUCCESS';
export const GET_POKEMONS_FAILED = 'GET_POKEMONS_FAILED';

export interface Pokemon {
  id: number;
  image_url: string;
  name: string;
  types: string[];
}

export interface PokemonState {
  hasMore: boolean;
  pokemons: Pokemon[];
  status: Status;
  offset: number;
}

export interface GetPokemonsStartAction {
  type: typeof GET_POKEMONS_START;
}

export interface GetPokemonsSuccessAction {
  type: typeof GET_POKEMONS_SUCCESS;
  payload: { hasMore: boolean; pokemons: Pokemon[]; count: number };
}

export interface GetPokemonsFailedAction {
  type: typeof GET_POKEMONS_FAILED;
  payload: { error: string };
}

export type PokemonsActionTypes =
  | GetPokemonsStartAction
  | GetPokemonsSuccessAction
  | GetPokemonsFailedAction;

/* FAVORITE TYPES */

export const GET_FAVORITES_START = 'GET_FAVORITES_START';
export const GET_FAVORITES_SUCCESS = 'GET_FAVORITES_SUCCESS';
export const GET_FAVORITES_FAILED = 'GET_FAVORITES_FAILED';

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

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

export interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: { pokemonId: string; uid: string };
}

export type FavoritesActionTypes =
  | GetFavoritesStartAction
  | GetFavoritesSuccessAction
  | GetFavoritesFailedAction
  | AddFavoriteAction
  | RemoveFavoriteAction;
