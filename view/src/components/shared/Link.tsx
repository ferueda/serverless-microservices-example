import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

type Props = {
  to: string;
  children: ReactNode;
};

function Link({ to, children }: Props) {
  return (
    <ChakraLink as={RouterLink} to={to} color="blue.500" mx={2}>
      {children}
    </ChakraLink>
  );
}

export default Link;
