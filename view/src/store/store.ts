import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './auth';
import favoritesReducer from './favorites';
import pokemonsReducer from './pokemons';

const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
  pokemons: pokemonsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;

export type AppState = ReturnType<typeof rootReducer>;
