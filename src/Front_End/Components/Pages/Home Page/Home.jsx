import { Box, Heading, Text } from "@chakra-ui/react";
import BigLogo from "../../Logo/BigLogo";

const Home = () => {
  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="center"
      as="main"
      position="fixed"
      mt="50"
      bgColor="white"
      w="100%"
      h="100vh"
      p={20}
    >
      <Box maxW="32rem">
        <BigLogo width="100%" />
        <Heading mb={4}>Welcome to SomeBunny.</Heading>
        <Text fontSize="xl">
          SomeBunny connects a community of animal lovers with their future
          pets. Join today to foster, adopt, and explore.
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
