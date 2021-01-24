import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

import { Container } from '@chakra-ui/react';

function Nav() {
  return (
    <Container
      as="nav"
      mx="auto"
      maxWidth={800}
      centerContent
      display="flex"
      flexDir="row"
      justifyContent="space-evenly"
    >
      <Link to={ROUTES.home}>Home</Link>
      <Link to={ROUTES.signup}>Sign Up</Link>
    </Container>
  );
}

export default Nav;
