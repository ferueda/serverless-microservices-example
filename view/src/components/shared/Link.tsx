import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

function Link({ to, children }: { to: string; children: ReactNode }) {
  return (
    <ChakraLink as={RouterLink} to={to} color="blue.500">
      {children}
    </ChakraLink>
  );
}

export default Link;
