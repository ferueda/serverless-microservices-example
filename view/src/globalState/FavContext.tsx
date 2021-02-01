import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { getFavorites } from '../services/firebase';
import { AuthContext } from './AuthContext';
import type { Pokemon } from '../types/IPokemon';

export const FavContext = createContext<any>(null);

function FavContextProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Pokemon[] | null>(null);

  const [user] = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    getFavorites(user.uid)
      .then((res) => {
        const pokemons: Pokemon[] = [];
        res.forEach((pokemon) => pokemons.push(pokemon.data() as Pokemon));
        setFavorites(pokemons);
      })
      .catch((error) => console.error(error));
  }, [user]);

  return <FavContext.Provider value={[favorites, setFavorites]}>{children}</FavContext.Provider>;
}

export default FavContextProvider;
