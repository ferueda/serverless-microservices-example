import { Container, Heading, Image, Text } from '@chakra-ui/react';

function PlaceCard({ place }: any) {
  const { country, city, state } = place.location;
  return (
    <Container
      w="100%"
      maxW="100%"
      m={0}
      p={4}
      border="1px"
      borderColor="gray.100"
      borderRadius="md"
      shadow="md"
      cursor="pointer"
      _hover={{
        shadow: 'lg',
      }}
    >
      <Image
        src={place.thumb_url}
        alt={`${place.name} thumbnail`}
        width="350px"
        height="200px"
        objectFit="cover"
        borderRadius="md"
      />

      <Heading as="h3" size="md" my={2}>
        {place.name}
      </Heading>

      <Text fontSize="sm" color="gray.600">{`${city}, ${state}, ${country}.`}</Text>
      {place.accessible ? (
        <Text fontSize="sm" color="green.600">
          <strong>Accessible</strong>
        </Text>
      ) : (
        <Text fontSize="sm" color="red.600">
          <strong>Not Accessible</strong>
        </Text>
      )}
    </Container>
  );
}

export default PlaceCard;
