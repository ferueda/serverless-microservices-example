import type { Dispatch } from 'redux';
import { getPokemons } from '../services/api';
import {
  GET_POKEMONS_FAILED,
  GET_POKEMONS_START,
  GET_POKEMONS_SUCCESS,
  PokemonsActionTypes,
  PokemonState,
} from './types';

/* ACTIONS */

export function getAllPokemons(offset: number = 0) {
  return async (dispatch: Dispatch<PokemonsActionTypes>) => {
    dispatch({ type: GET_POKEMONS_START });

    try {
      const { count, hasMore, data } = await getPokemons(offset);
      dispatch({
        type: GET_POKEMONS_SUCCESS,
        payload: { count, hasMore, pokemons: data },
      });
    } catch (error) {
      dispatch({
        type: GET_POKEMONS_FAILED,
        payload: error,
      });
    }
  };
}

/* REDUCER */

const initialState: PokemonState = { hasMore: false, offset: 0, pokemons: [], status: 'idle' };

export default function pokemonsReducer(
  state: PokemonState = initialState,
  action: PokemonsActionTypes,
): PokemonState {
  switch (action.type) {
    case GET_POKEMONS_START:
      return {
        ...state,
        status: 'pending',
      };

    case GET_POKEMONS_SUCCESS:
      return {
        hasMore: action.payload.hasMore,
        pokemons: [...state.pokemons, ...action.payload.pokemons],
        status: 'resolved',
        offset: state.offset + action.payload.count,
      };

    case GET_POKEMONS_FAILED:
      return {
        hasMore: false,
        pokemons: [],
        status: 'rejected',
        offset: 0,
      };

    default:
      return state;
  }
}
