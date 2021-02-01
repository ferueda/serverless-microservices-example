import { Pokemon } from './IPokemon';

export interface Favorite extends Pokemon {
  uid: string;
}
