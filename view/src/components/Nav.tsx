import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { Box, Text, Icon } from '@chakra-ui/react';

import NavLink from './shared/NavLink';

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth';

import { BsFillPersonFill } from 'react-icons/bs';
import type { AppState } from '../store/store';
import type { AuthState } from '../store/types';

function Nav() {
  const { user } = useSelector<AppState, AuthState>((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      history.push(ROUTES.login);
    } catch (error) {
      console.error(error);
    }
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
            <NavLink to={ROUTES.home}>Pokemons</NavLink>
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
        <>
          <Box>
            <NavLink to={ROUTES.home}>Pokemons</NavLink>
          </Box>

          <Box ml="auto">
            <NavLink to={ROUTES.login}>Log In</NavLink>
            <NavLink to={ROUTES.signup}>Sign Up</NavLink>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Nav;
