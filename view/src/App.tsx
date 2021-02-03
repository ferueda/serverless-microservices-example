import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Box } from '@chakra-ui/react';

import { ROUTES } from './utils/constants';

import { getAllPokemons } from './store/pokemons';
import { getFavoritePokemons } from './store/favorites';
import type { AppState } from './store/store';
import type { AuthState } from './store/types';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

import Nav from './components/Nav';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector<AppState, AuthState>((state) => state.auth);

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;

    dispatch(getFavoritePokemons(user.uid));
  }, [user, dispatch]);

  return (
    <>
      <Box minHeight="100vh" w="100%" p={0}>
        <Nav />

        <Container as="main" display="flex" maxW={1200} width="100%" minHeight="94vh">
          <Switch>
            <Route exact path={ROUTES.home}>
              <Home />
            </Route>

            <Route path={ROUTES.signup}>
              <SignUp />
            </Route>

            <Route path={ROUTES.login}>
              <Login />
            </Route>

            <Route path="*">
              <Redirect to={ROUTES.home} />
            </Route>
          </Switch>
        </Container>
      </Box>
    </>
  );
}

export default App;
