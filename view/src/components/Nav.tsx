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
    >
      {user ? (
        <>
          <Box>
            <NavLink to={ROUTES.home}>Home</NavLink>
          </Box>
          <Box d="flex" alignItems="center">
            <Box d="flex" alignItems="center" mx={2}>
              <Icon as={BsFillPersonFill} w={5} h={5} mr={1} color="gray.600" />
              <Text>{user?.first_name}</Text>
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
