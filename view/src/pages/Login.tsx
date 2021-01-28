import { useState, useContext } from 'react';
import { Container, Heading, Text } from '@chakra-ui/react';
import { Redirect, useHistory } from 'react-router-dom';
import { logInWithEmailAndPassowrd } from '../services/firebase';
import { ROUTES } from '../utils/constants';

import FormInput from '../components/Form/FormInput';
import FormButton from '../components/Form/FormButton';
import Form from '../components/Form/Form';

import Link from '../components/shared/Link';

import { AuthContext } from '../globalState/AuthContext';

function Login() {
  const [email, setEmail] = useState<string>('f@f.cl');
  const [password, setPassword] = useState<string>('123123');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, setUser] = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>): void => {
    e.preventDefault();

    setIsLoading(true);

    logInWithEmailAndPassowrd(email, password)
      .then((user) => {
        setEmail('');
        setPassword('');
        setIsLoading(false);
        setUser(user);
        history.push(ROUTES.home);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  if (user) {
    return <Redirect to={ROUTES.home} />;
  }

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
          My App
        </Heading>

        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />

        <FormButton type="submit" isLoading={isLoading}>
          Log in
        </FormButton>

        <Text mt={2}>
          Don't have an account yet?
          <Link to={ROUTES.signup}>Sign up</Link>
        </Text>
      </Form>
    </Container>
  );
}

export default Login;
