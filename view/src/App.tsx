import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from './utils/constants';
import { Container } from '@chakra-ui/react';

import Home from './pages/Home';
import SignUp from './pages/SignUp';

import Nav from './components/Nav';

function App() {
  return (
    <Container maxWidth={1200} minHeight="100vh" mx="auto">
      <Nav />

      <Container as="main" display="flex" minHeight="100%">
        <Switch>
          <Route exact path={ROUTES.home}>
            <Home />
          </Route>

          <Route path={ROUTES.signup}>
            <SignUp />
          </Route>

          <Route path="*">
            <Redirect to={ROUTES.home} />
          </Route>
        </Switch>
      </Container>
    </Container>
  );
}

export default App;
