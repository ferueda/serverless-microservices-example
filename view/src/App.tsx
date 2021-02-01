import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from './utils/constants';
import { Container, Box } from '@chakra-ui/react';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

import Nav from './components/Nav';

import AuthContextProvider from './globalState/AuthContext';
import FavContextProvider from './globalState/FavContext';

function App() {
  return (
    <AuthContextProvider>
      <FavContextProvider>
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
      </FavContextProvider>
    </AuthContextProvider>
  );
}

export default App;
