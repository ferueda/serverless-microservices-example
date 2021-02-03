import type { Dispatch } from 'redux';
import { AuthActionTypes, AuthState, LOGIN_USER_FAILED, LOGIN_USER_START } from './types';
import { LOGIN_USER_SUCCESS, LOGOUT_USER } from './types';
import { logInWithEmailAndPassowrd, logOutCurrentUser } from '../services/firebase';

/* ACTIONS */

export function loginUser(email: string, password: string) {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: LOGIN_USER_START });
    try {
      const authedUser = await logInWithEmailAndPassowrd(email, password);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: authedUser,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAILED,
        payload: error,
      });
    }
  };
}

export function logoutUser() {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      await logOutCurrentUser();
      dispatch({
        type: LOGOUT_USER,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

/* RDUCER */
const initialState: AuthState = { user: null, status: 'idle', error: null };

export default function authReducer(
  state: AuthState = initialState,
  action: AuthActionTypes,
): AuthState {
  switch (action.type) {
    case LOGIN_USER_START:
      return {
        user: null,
        status: 'pending',
        error: null,
      };

    case LOGIN_USER_SUCCESS:
      return { user: action.payload, status: 'resolved', error: null };

    case LOGIN_USER_FAILED:
      return { user: null, status: 'rejected', error: action.payload.error };

    case LOGOUT_USER:
      return { user: null, status: 'resolved', error: null };

    default:
      return state;
  }
}
