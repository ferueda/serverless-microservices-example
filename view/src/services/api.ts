import { ENDPOINTS } from '../utils/constants';
import { IUser } from '../types/IUser';

export async function postNewUserToDb(userData: IUser): Promise<IUser> {
  const res = await fetch(ENDPOINTS.signUp, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return await res.json();
}

export async function getPlaces(token: string): Promise<any[]> {
  const res = await fetch(ENDPOINTS.places, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}
