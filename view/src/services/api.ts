import { ENDPOINTS } from '../utils/constants';
import { UserData } from '../interfaces/IuserData';

export async function postNewUserToDb(userData: UserData) {
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
