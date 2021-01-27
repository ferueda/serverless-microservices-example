import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

type Props = {
  to: string;
  children: ReactNode;
};

function Link({ to, children }: Props) {
  return (
    <ChakraLink
      as={NavLink}
      exact
      activeStyle={{ fontWeight: 'bold', color: '#3182CE' }}
      to={to}
      mx={2}
      _hover={{ color: 'blue.500' }}
    >
      {children}
    </ChakraLink>
  );
}

export default Link;
