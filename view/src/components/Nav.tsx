import { useContext } from 'react';
import { ROUTES } from '../utils/constants';
import { Container, Text } from '@chakra-ui/react';

import NavLink from './shared/NavLink';

import { AuthContext } from '../globalState/authContext';
import { logOutCurrentUser } from '../services/firebase';

function Nav() {
  const [user, setUser] = useContext<any>(AuthContext);

  const handleLogout = () => {
    logOutCurrentUser()
      .then(() => {
        setUser(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container
      as="nav"
      mx="auto"
      py={4}
      maxWidth={800}
      centerContent
      display="flex"
      flexDir="row"
      justifyContent="space-evenly"
    >
      {user ? (
        <>
          <NavLink to={ROUTES.home}>Home</NavLink>
          <Text as="button" onClick={handleLogout} _hover={{ color: 'blue.500' }}>
            Log out
          </Text>
        </>
      ) : (
        <>
          <NavLink to={ROUTES.signup}>Sign Up</NavLink>
          <NavLink to={ROUTES.login}>Log In</NavLink>
        </>
      )}
    </Container>
  );
}

export default Nav;
