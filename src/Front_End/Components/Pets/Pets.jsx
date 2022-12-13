import {
  Box,
  Button,
  Heading,
  Flex,
  Text,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback, useContext, useMemo } from "react";
import AuthContext from "../../contexts/authContext";
import PetList from "./PetList";
import usePets from "../../hooks/usePets";

const Pets = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { data, refetchPets, isFetching: isLoading } = usePets();
  const [isShowingSaved, setIsShowingSaved] = useState(false);

  useEffect(() => {
    refetchPets();
  }, [refetchPets]);

  const [petsToDisplay, setPetsToDisplay] = useState(null);
  const [isDisplayingAdminPets, setIsDisplayingAdminPets] = useState(false);

  const isAdmin = useMemo(
    () => isLoggedIn.accessLevel === "admin",
    [isLoggedIn]
  );

  const finalList = useMemo(
    () =>
      data.filter((pet) =>
        isShowingSaved === true
          ? isLoggedIn.savedPets.includes(pet._id)
          : isLoggedIn.adoptedPets.includes(pet._id) ||
            isLoggedIn.fosteredPets.includes(pet._id)
      ),
    [isLoggedIn, data, isShowingSaved]
  );

  const ownedPets = [...isLoggedIn.fosteredPets, ...isLoggedIn.adoptedPets];

  const displayMyPets = useCallback(() => {
    setIsShowingSaved(!isShowingSaved);

    if (isShowingSaved === true && ownedPets.length === 0) {
      setPetsToDisplay(
        <Text color="red.300" fontSize="xl" mt={5} textAlign="center">
          You do not own or foster any pets 😥
        </Text>
      );
    } else if (isLoggedIn.savedPets.length === 0 && isShowingSaved === false) {
      setPetsToDisplay(
        <Text color="red.300" fontSize="xl" mt={5} textAlign="center">
          You do not have any saved pets to display 🐾
        </Text>
      );
    } else {
      setPetsToDisplay(null);
    }
  }, [isShowingSaved, isLoggedIn.savedPets.length, ownedPets.length]);

  return (
    <Box
      position="fixed"
      zIndex={0}
      mt="50"
      bgColor="white"
      w="100%"
      h="100vh"
      pb={70}
      overflowY="scroll"
    >
      {isAdmin ? (
        <Button
          onClick={() => setIsDisplayingAdminPets(!isDisplayingAdminPets)}
          width="100%"
          bgColor={isDisplayingAdminPets ? "teal.300" : "orange.300"}
          color={isDisplayingAdminPets ? "teal.50" : "orange.50"}
          pt={10}
          pb={10}
          fontSize="2xl"
        >
          {" "}
          {!isDisplayingAdminPets
            ? "Show All Pets for Admin Edit and Control 💪"
            : "Show only my personal pets 💖"}{" "}
        </Button>
      ) : null}

      {!isDisplayingAdminPets || !isAdmin ? (
        <Box>
          <Heading p={5} textAlign="center">
            {isShowingSaved ? "Saved Pets" : "My Pets"}:
          </Heading>
          <Box m={10}>
            <Flex gap={5} alignItems="center" justifyContent={"center"}>
              <Button
                bgColor="green.100"
                onClick={() => {
                  displayMyPets();
                }}
                mb={10}
              >
                {isShowingSaved ? "🤗 Show My Pets" : "❤️ Show Saved Pets"}
              </Button>
            </Flex>
            {petsToDisplay}
            <PetList data={finalList} />
          </Box>{" "}
        </Box>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          {" "}
          <Heading textAlign="center" p={5}>
            {" "}
            All Pets
          </Heading>
          {isLoading ? <Spinner size="xl" /> : <PetList data={data} />}{" "}
        </Stack>
      )}
    </Box>
  );
};

export default Pets;
