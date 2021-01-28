import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from './utils/constants';
import { Container } from '@chakra-ui/react';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

import Nav from './components/Nav';

import AuthContextProvider from './globalState/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Container maxWidth={1200} minHeight="100vh" mx="auto" p={0}>
        <Nav />

        <Container as="main" display="flex" minHeight="100%">
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
      </Container>
    </AuthContextProvider>
  );
}

export default App;
