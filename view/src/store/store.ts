import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './auth';
import favoritesReducer from './favorites';

const rootReducer = combineReducers({ auth: authReducer, favorites: favoritesReducer });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;

export type AppState = ReturnType<typeof rootReducer>;
