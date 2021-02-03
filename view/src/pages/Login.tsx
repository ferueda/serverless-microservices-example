import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Heading, Text } from '@chakra-ui/react';
import { Redirect, useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { loginUser } from '../store/auth';

import FormInput from '../components/Form/FormInput';
import FormButton from '../components/Form/FormButton';
import Form from '../components/Form/Form';

import Link from '../components/shared/Link';

import type { AppState } from '../store/store';
import type { AuthState } from '../store/types';

function Login() {
  const [email, setEmail] = useState<string>('f@f.cl');
  const [password, setPassword] = useState<string>('123123');

  const { user, status } = useSelector<AppState, AuthState>((state) => state.auth);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(email, password));
      history.push(ROUTES.home);
    } catch (error) {
      console.error(error);
    }
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

        <FormButton type="submit" isLoading={status === 'pending'}>
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
