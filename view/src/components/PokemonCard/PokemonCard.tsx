import { useDispatch, useSelector } from 'react-redux';
import { Container, Heading, Image, HStack, Tag, Icon, Box } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import type { AppState } from '../../store/store';
import type { AuthState, Favorite, Favorites, Pokemon } from '../../store/types';
import { addFavoritePokemon } from '../../store/favorites';

interface Props {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: Props) {
  const { user } = useSelector<AppState, AuthState>((state) => state.auth);
  const favorites = useSelector<AppState, Favorites>((state) => state.favorites);
  const dispatch = useDispatch();
  const isFavorite = favorites?.map((favorite: Favorite) => favorite.id).includes(pokemon.id);

  const handleAddFavorite = async () => {
    if (!user) return;
    if (isFavorite) return;

    await dispatch(addFavoritePokemon(pokemon, user.uid));
  };

  const handleRemoveFavorite = () => {
    if (!user) return;
    if (!isFavorite) return;

    // removeFavorite(String(pokemon.id), user.uid)
    //   .then(() =>
    //     setFavorites((state: any) => state.filter((favorite: any) => favorite.id !== pokemon.id)),
    //   )
    //   .catch((error) => console.log(error));
  };
  return (
    <Container
      w="100%"
      maxW="100%"
      m={0}
      p={4}
      border="1px"
      d="flex"
      flexDir="column"
      borderColor="gray.100"
      borderRadius="md"
      shadow="md"
      _hover={{
        shadow: 'lg',
      }}
    >
      {user && (
        <Box
          alignSelf="flex-end"
          width="16px"
          color={isFavorite ? 'yellow.400' : 'gray.600'}
          cursor="pointer"
          _hover={{ color: 'yellow.400' }}
          onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
        >
          <Icon as={isFavorite ? AiFillStar : AiOutlineStar} w={5} h={5} />
        </Box>
      )}
      <Image
        src={pokemon.image_url}
        alt={`${pokemon.name} thumbnail`}
        objectFit="cover"
        borderRadius="md"
      />

      <Heading as="h3" size="md" my={2}>
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </Heading>

      <HStack spacing={2}>
        {pokemon.types.map((type) => (
          <Tag key={type} borderRadius="full" variant="outline" colorScheme="gray" size="sm">
            {type}
          </Tag>
        ))}
      </HStack>
    </Container>
  );
}

export default PokemonCard;
