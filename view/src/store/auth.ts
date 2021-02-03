import type { Dispatch } from 'redux';
import { AuthActionTypes, AuthState, LOGIN_USER_FAILED, AUTH_REQUEST, SIGN_UP_USER } from './types';
import { LOGIN_USER_SUCCESS, LOGOUT_USER } from './types';
import {
  logInWithEmailAndPassowrd,
  logOutCurrentUser,
  signUpNewUserWithEmailAndPassword,
} from '../services/firebase';

/* ACTIONS */

export function loginUser(email: string, password: string) {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: AUTH_REQUEST });
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

export function signupUser(userData: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: AUTH_REQUEST });
    try {
      const authedUser = await signUpNewUserWithEmailAndPassword(userData);
      dispatch({
        type: SIGN_UP_USER,
        payload: authedUser,
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
    case AUTH_REQUEST:
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

    case SIGN_UP_USER:
      return {
        user: action.payload,
        error: null,
        status: 'resolved',
      };

    default:
      return state;
  }
}
