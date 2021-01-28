import { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Container, Heading, Text } from '@chakra-ui/react';
import { ROUTES } from '../utils/constants';

import { signUpNewUserWithEmailAndPassword } from '../services/firebase';

import FormInput from '../components/Form/FormInput';
import FormButton from '../components/Form/FormButton';
import Form from '../components/Form/Form';

import Link from '../components/shared/Link';

import { AuthContext } from '../globalState/AuthContext';
import { IUserData } from '../types/IUser';

function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, setUser] = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>): void => {
    e.preventDefault();

    setIsLoading(true);

    const userData: IUserData = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };

    signUpNewUserWithEmailAndPassword(userData)
      .then((signedUpUser) => {
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setIsLoading(false);
        setUser(signedUpUser);
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

        <FormButton type="submit" isLoading={isLoading}>
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
