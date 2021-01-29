import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { Box, Text, Icon } from '@chakra-ui/react';

import NavLink from './shared/NavLink';

import { AuthContext } from '../globalState/AuthContext';
import { logOutCurrentUser } from '../services/firebase';

import { BsFillPersonFill } from 'react-icons/bs';

function Nav() {
  const [user, setUser] = useContext<any>(AuthContext);

  const history = useHistory();

  const handleLogout = () => {
    logOutCurrentUser()
      .then(() => {
        setUser(null);
        history.push(ROUTES.login);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      as="nav"
      py={4}
      px={12}
      width="100%"
      display="flex"
      justifyContent="space-between"
      shadow="md"
      height="6vh"
      pos="sticky"
      top={0}
      left={0}
      zIndex={100}
      bg="white"
    >
      {user ? (
        <>
          <Box>
            <NavLink to={ROUTES.home}>Home</NavLink>
          </Box>

          <Box d="flex" alignItems="center">
            <Box d="flex" alignItems="center" mx={2}>
              <Icon as={BsFillPersonFill} w={6} h={6} mr={1} color="green.600" />

              <Text color="green.600">
                <strong>{user?.first_name} </strong>
              </Text>
            </Box>

            <Text as="button" onClick={handleLogout} _hover={{ color: 'blue.500' }} mx={2}>
              Log out
            </Text>
          </Box>
        </>
      ) : (
        <Box ml="auto">
          <NavLink to={ROUTES.login}>Log In</NavLink>
          <NavLink to={ROUTES.signup}>Sign Up</NavLink>
        </Box>
      )}
    </Box>
  );
}

export default Nav;
