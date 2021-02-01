import { useContext } from 'react';
import { Container, Heading, Image, HStack, Tag, Icon, Box } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { addFavorite, removeFavorite } from '../../services/firebase';
import { AuthContext } from '../../globalState/AuthContext';
import { FavContext } from '../../globalState/FavContext';
import type { Favorite } from '../../types/IFavorites';
import type { Pokemon } from '../../types/IPokemon';

interface Props {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: Props) {
  const [user] = useContext(AuthContext);
  const [favorites, setFavorites] = useContext(FavContext);

  const isFavorite = favorites?.map((favorite: Favorite) => favorite.id).includes(pokemon.id);

  const handleAddFavorite = () => {
    if (!user) return;
    if (isFavorite) return;

    addFavorite(pokemon, user.uid)
      .then(() => setFavorites((state: any) => [...state, { ...pokemon, uid: user.uid }]))
      .catch((error) => console.error(error));
  };

  const handleRemoveFavorite = () => {
    if (!user) return;
    if (!isFavorite) return;

    removeFavorite(String(pokemon.id), user.uid)
      .then(() =>
        setFavorites((state: any) => state.filter((favorite: any) => favorite.id !== pokemon.id)),
      )
      .catch((error) => console.log(error));
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
