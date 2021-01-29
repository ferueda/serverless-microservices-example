import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getPlaces } from '../services/api';
import { Button, Container, Grid, Text, Heading } from '@chakra-ui/react';

import { AuthContext } from '../globalState/AuthContext';
import { ROUTES } from '../utils/constants';

import PlaceCard from '../components/PlaceCard/PlaceCard';

function Home() {
  const [user] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setPlaces([]);

    getPlaces(user?.authToken)
      .then((res: any) => {
        setPlaces(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [user]);

  console.log(places);

  if (!user) {
    return <Redirect to={ROUTES.login} />;
  }

  return (
    <Container py={4} width="100%" maxW="100%">
      <Heading as="h2" color="gray.700" textAlign="center" mt={4} mb={6}>
        My Places
      </Heading>

      {isLoading && <Text textAlign="center">Loading</Text>}

      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
        {places.map((place) => (
          <PlaceCard key={place.name} place={place} />
        ))}
      </Grid>

      <Button type="button" colorScheme="red" pos="fixed" right={5} top={20} zIndex={100}>
        New Place
      </Button>
    </Container>
  );
}

export default Home;
