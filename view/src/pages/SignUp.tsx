import { useState } from 'react';
import { Container, Heading, Text } from '@chakra-ui/react';
import { signUpNewUserWithEmailAndPassword } from '../services/firebase';
import { postNewUserToDb } from '../services/api';
import { UserData } from '../interfaces/IuserData';

import FormInput from '../components/Form/FormInput';
import FormButton from '../components/Form/FormButton';
import Form from '../components/Form/Form';
import Link from '../components/shared/Link';

import { ROUTES } from '../utils/constants';

function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>): void => {
    e.preventDefault();

    signUpNewUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const userData: UserData = {
          email: user?.email,
          uid: user?.uid,
        };

        return postNewUserToDb(userData);
      })
      .then(() => {
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.log(error);
      });
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
      <Form onSubmit={handleSubmit}>
        <Heading as="h2" mb={4}>
          Sign up with us
        </Heading>

        <FormInput
          label="Email"
          id="email"
          placeholder="example@email.com"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <FormButton type="submit">Sign Up</FormButton>

        <Text mt={2}>
          Already have an account? <Link to={ROUTES.login}>Log in</Link>
        </Text>
      </Form>
    </Container>
  );
}

export default SignUp;
