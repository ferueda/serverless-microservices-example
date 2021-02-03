import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Container, Heading, Text } from '@chakra-ui/react';

import { ROUTES } from '../utils/constants';

import { signupUser } from '../store/auth';
import type { AppState } from '../store/store';
import type { AuthState } from '../store/types';
import type { IUserData } from '../types/IUser';

import FormInput from '../components/Form/FormInput';
import FormButton from '../components/Form/FormButton';
import Form from '../components/Form/Form';
import Link from '../components/shared/Link';

function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const dispatch = useDispatch();
  const { user, status } = useSelector<AppState, AuthState>((state) => state.auth);

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const userData: IUserData = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };

    await dispatch(signupUser(userData));
    history.push(ROUTES.home);
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
          Sign up with us
        </Heading>

        <FormInput
          label="First name"
          id="firstName"
          placeholder="John"
          value={firstName}
          onChange={({ target }) => setFirstName(target.value)}
          required
        />

        <FormInput
          label="Last name"
          id="lastName"
          placeholder="Doe"
          value={lastName}
          onChange={({ target }) => setLastName(target.value)}
          required
        />

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
          Sign Up
        </FormButton>

        <Text mt={2}>
          Already have an account?
          <Link to={ROUTES.login}>Log in</Link>
        </Text>
      </Form>
    </Container>
  );
}

export default SignUp;
