import { useEffect, useState } from 'react';
import { getPokemons } from '../services/api';
import { Button, Container, Grid, Text, Heading } from '@chakra-ui/react';

import type { Pokemon } from '../types/IPokemon';
import PokemonCard from '../components/PokemonCard/PokemonCard';

function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getPokemons(offset)
      .then((res: any) => {
        setPokemons((oldState) => [...oldState, ...res.data]);
        setHasMore(res.hasMore);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [offset]);

  return (
    <Container py={4} width="100%" maxW="100%">
      <Heading as="h2" color="gray.700" textAlign="center" mt={4} mb={6}>
        Pokemons
      </Heading>

      <Grid templateColumns="repeat(auto-fit, minmax(184px, 1fr))" gap={6}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid>

      {isLoading && <Text textAlign="center">Loading</Text>}

      {hasMore && (
        <Button
          type="button"
          colorScheme="red"
          pos="fixed"
          right={5}
          top={20}
          zIndex={100}
          onClick={() => setOffset((state) => state + 20)}
          isLoading={isLoading}
        >
          Load More
        </Button>
      )}
    </Container>
  );
}

export default Home;
