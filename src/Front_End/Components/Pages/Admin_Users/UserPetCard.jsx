import { Image, Box, Heading, Flex, Text, Link, Stack } from "@chakra-ui/react";
import { useMemo } from "react";

const UserPetCard = ({
  name,
  status,
  imageSource,
  credit,
  photographer,
  site,
  type,
}) => {
  const petType = useMemo(() => {
    if (type === "rabbit") {
      return <Text>🐇</Text>;
    } else if (type === "cat") {
      return <Text>🐈</Text>;
    } else {
      return <Text>🐩</Text>;
    }
  }, [type]);

  return (
    <Stack
      bgColor="yellow.50"
      borderColor="yellow.100"
      border="yellow solid 1pt"
      p={1}
      mb={2}
      borderRadius={10}
      w="20%"
      h="fit"
      align="center"
      justify="space-between"
    >
      <Flex
        justifyContent="space-between"
        gap={10}
        alignItems="center"
        w="100%"
      >
        <Text
          borderRadius={20}
          bgColor={status === "adopted" ? "red.100" : "teal.100"}
          padding={2}
          fontSize="small"
        >
          {status}
        </Text>
        <Text opacity={0.5}>{petType}</Text>
      </Flex>
      {imageSource ? (
        <Image
          borderRadius={10}
          //   h="auto"
          w="50%"
          maxW="300px"
          objectFit="contain"
          alt="image of pet"
          src={imageSource}
        ></Image>
      ) : (
        <Box fontSize="x-large">🦄</Box>
      )}
      <Heading fontSize="small">{name}</Heading>

      <Text fontSize="xx-small">
        Photo by:{" "}
        <Link isExternal color="teal.500" href={photographer}>
          {credit}
        </Link>{" "}
        via{" "}
        <Link isExternal color="teal.500" href={site}>
          Unsplash
        </Link>
      </Text>
    </Stack>
  );
};

export default UserPetCard;
