import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLDivElement>) => void;
}

function Form({ children, onSubmit }: Props) {
  return (
    <Container
      as="form"
      display="flex"
      flexDir="column"
      alignItems="center"
      border="1px"
      borderColor="gray.200"
      p={4}
      borderRadius="md"
      shadow="md"
      onSubmit={onSubmit}
    >
      {children}
    </Container>
  );
}

export default Form;
