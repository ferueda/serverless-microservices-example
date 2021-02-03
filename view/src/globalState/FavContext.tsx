import { createContext, ReactNode, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoritePokemons } from '../store/favorites';
import type { AppState } from '../store/store';
import type { AuthState } from '../store/types';

export const FavContext = createContext<any>(null);

function FavContextProvider({ children }: { children: ReactNode }) {
  const { user } = useSelector<AppState, AuthState>((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    dispatch(getFavoritePokemons(user.uid));
  }, [user, dispatch]);

  return <FavContext.Provider value={user}>{children}</FavContext.Provider>;
}

export default FavContextProvider;
