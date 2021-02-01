import { ENDPOINTS } from '../utils/constants';
import type { IUser } from '../types/IUser';
import type { Pokemon } from '../types/IPokemon';

export async function postNewUserToDb(userData: IUser): Promise<IUser> {
  const res = await fetch(ENDPOINTS.signUp, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}

export async function getPokemons(
  offset: number = 0,
): Promise<{ hasMore: boolean; count: number; data: Pokemon[] }[]> {
  const res = await fetch(`${ENDPOINTS.pokemons}?offset=${offset}`, {
    method: 'GET',
    mode: 'cors',
  });

  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}
