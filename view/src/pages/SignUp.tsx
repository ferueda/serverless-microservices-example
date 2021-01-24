import { useState } from 'react';
import { Button, Container, FormLabel, Input, Flex, Heading } from '@chakra-ui/react';
import { signUpNewUserWithEmailAndPassword } from '../services/firebase';

function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>): void => {
    e.preventDefault();

    signUpNewUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        setEmail('');
        setPassword('');
      })
      .catch((error) => console.log('error: ', error));
  };

  return (
    <Container
      width="100%"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
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
        onSubmit={handleSubmit}
      >
        <Heading as="h2" mb={4}>
          Sign up with us!
        </Heading>

        <Flex alignItems="center" w="100%" justifyContent="space-between">
          <FormLabel htmlFor="email" width={32} m={0} p={0}>
            Email
          </FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </Flex>

        <Flex alignItems="center" w="100%" mt={4}>
          <FormLabel htmlFor="password" width={32} m={0} p={0}>
            Passowrd
          </FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Flex>
        <Button type="submit" mt={4} shadow="md" colorScheme="blue">
          Sign up
        </Button>
      </Container>
    </Container>
  );
}

export default SignUp;
