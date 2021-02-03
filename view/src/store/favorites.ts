import type { Dispatch } from 'redux';
import {
  FavoritesActionTypes,
  GET_FAVORITES_START,
  GET_FAVORITES_SUCCESS,
  Pokemon,
  Favorites,
  GET_FAVORITES_FAILED,
  ADD_FAVORITE,
  Favorite,
  REMOVE_FAVORITE,
} from './types';
import { getFavorites, addFavorite, removeFavorite } from '../services/firebase';

/* ACTIONS */

export function getFavoritePokemons(uid: string) {
  return async (dispatch: Dispatch<FavoritesActionTypes>) => {
    dispatch({ type: GET_FAVORITES_START });
    try {
      let favorites: Favorites = [];
      const favSnapshot = await getFavorites(uid);
      favSnapshot.forEach((doc) => favorites.push(doc.data() as Favorite));

      dispatch({
        type: GET_FAVORITES_SUCCESS,
        payload: favorites,
      });
    } catch (error) {
      dispatch({
        type: GET_FAVORITES_FAILED,
        payload: error,
      });
    }
  };
}

export function addFavoritePokemon(pokemon: Pokemon, uid: string) {
  return async (dispatch: Dispatch<FavoritesActionTypes>) => {
    try {
      await addFavorite(pokemon, uid);
      dispatch({
        type: ADD_FAVORITE,
        payload: { pokemon, uid },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function removeFavoritePokemon(pokemonId: string, uid: string) {
  return async (dispatch: Dispatch<FavoritesActionTypes>) => {
    try {
      await removeFavorite(pokemonId, uid);
      dispatch({
        type: REMOVE_FAVORITE,
        payload: { pokemonId, uid },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

/* REDUCER */
const initialState: Favorites = [];

export default function favoritesReducer(
  state: Favorites = initialState,
  action: FavoritesActionTypes,
): Favorites {
  switch (action.type) {
    case GET_FAVORITES_START:
      return [];

    case GET_FAVORITES_SUCCESS:
      return [...state, ...action.payload];

    case GET_FAVORITES_FAILED:
      return [];

    case ADD_FAVORITE:
      return [...state, { ...action.payload.pokemon, uid: action.payload.uid }];

    case REMOVE_FAVORITE:
      return state.filter((favorite) => String(favorite.id) !== action.payload.pokemonId);

    default:
      return state;
  }
}
