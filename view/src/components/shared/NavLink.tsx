import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

function Link({ to, children }: { to: string; children: ReactNode }) {
  return (
    <ChakraLink
      as={NavLink}
      exact
      activeStyle={{ fontWeight: 'bold', color: '#3182CE' }}
      to={to}
      _hover={{ color: 'blue.500' }}
    >
      {children}
    </ChakraLink>
  );
}

export default Link;
