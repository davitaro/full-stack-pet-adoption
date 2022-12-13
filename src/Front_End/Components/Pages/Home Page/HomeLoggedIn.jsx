import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import BigLogo from "../../Logo/BigLogo";
import { useContext, useEffect } from "react";
import AuthContext from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const HomeLoggedIn = () => {
  const { isLoggedIn: userInfo, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

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
      <Box maxW="960px">
        <Box>
          <BigLogo width="100%" />

          <Heading mb={4}>
            <Stack gap={2}>
              <Text>Welcome to your SomeBunny Account,</Text>
              <Text color="pink.500">
                {" "}
                {userInfo.firstName} {userInfo.lastName}!
              </Text>
            </Stack>
          </Heading>
          <Text fontSize="xl">
            Edit your profile, see your current pets, save pets for later,
            search pets, and foster and adopt.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeLoggedIn;
