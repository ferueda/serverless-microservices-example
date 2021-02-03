import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid, Heading } from '@chakra-ui/react';

import type { AppState } from '../store/store';
import type { PokemonState } from '../store/types';
import { getAllPokemons } from '../store/pokemons';

import PokemonCard from '../components/PokemonCard/PokemonCard';

function Home() {
  const dispatch = useDispatch();
  const { offset, status, hasMore, pokemons } = useSelector<AppState, PokemonState>(
    (state) => state.pokemons,
  );

  const handleMorePokemons = () => {
    dispatch(getAllPokemons(offset));
  };

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

      {hasMore && (
        <Button
          type="button"
          colorScheme="red"
          onClick={handleMorePokemons}
          isLoading={status === 'idle' || status === 'pending'}
          d="flex"
          mx="auto"
          my={6}
        >
          Load More
        </Button>
      )}
    </Container>
  );
}

export default Home;
