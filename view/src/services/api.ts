import { ENDPOINTS } from '../utils/constants';
import { IUser } from '../types/IUser';

export async function postNewUserToDb(userData: IUser): Promise<IUser> {
  const res = await fetch(ENDPOINTS.dev, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return await res.json();
}
