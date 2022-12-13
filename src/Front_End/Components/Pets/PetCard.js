import {
  Image,
  Box,
  Heading,
  Flex,
  Text,
  Link,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useMemo, useContext, useCallback } from "react";
import AuthContext from "../../contexts/authContext";
import usePet from "../../hooks/usePet";
import DeleteAlert from "../Alerts/Alert,";
import PetModal from "./PetModal";
import UpdatePetModal from "./UpdatePetModal";

const PetCard = ({
  id,
  name,
  height,
  weight,
  status,
  imageSource,
  modal,
  credit,
  photographer,
  site,
  bio,
  diet,
  breed,
  hypoallergenic,
  color,
  type,
  updateInfo,
}) => {
  const { deletePet, updateStatus } = usePet(id);
  const { isLoggedIn } = useContext(AuthContext);

  const isAdmin = useMemo(
    () => isLoggedIn.accessLevel === "admin",
    [isLoggedIn]
  );

  const handleSavePet = useCallback(
    async (id) => {
      updateInfo.mutate({
        savedPets: isLoggedIn.savedPets.includes(id)
          ? isLoggedIn.savedPets.filter((p) => p !== id)
          : [...isLoggedIn.savedPets, id],
      });
    },
    [isLoggedIn, updateInfo]
  );

  const changeStatus = useCallback(
    (newStatus) => {
      updateStatus.mutate({ status: newStatus });
    },
    [updateStatus]
  );

  const petIsAssignedToUser = useMemo(() => {
    if (isLoggedIn) {
      return (
        isLoggedIn.fosteredPets.find((p) => p === id) ||
        isLoggedIn.adoptedPets.find((p) => p === id)
        // ||
        // isAdmin
      );
    }
  }, [id, isLoggedIn]);

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
      p={5}
      borderRadius={10}
      w={modal ? 300 : 350}
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
        <Box
          borderRadius={20}
          bgColor={status === "adopted" ? "red.100" : "teal.100"}
          padding={2}
        >
          {status}
        </Box>
        {modal && <Box opacity={0.5}>{petType}</Box>}
        {isLoggedIn && (
          <Button
            mr={10}
            _hover={{ transform: "scale(1.5)" }}
            fontSize="2xl"
            bgColor="yellow.50"
            onClick={async () => {
              await handleSavePet(id);
            }}
          >
            {isLoggedIn?.savedPets?.includes(id) ? "❤️" : "🤍"}{" "}
          </Button>
        )}
      </Flex>

      <Heading>{name}</Heading>
      {imageSource ? (
        <Image
          borderRadius={100}
          h="auto"
          w="50%"
          maxW="300px"
          objectFit="contain"
          alt="image of pet"
          src={imageSource}
        ></Image>
      ) : (
        <Box fontSize="x-large">🦄</Box>
      )}
      <Box fontSize="small">
        Photo by:{" "}
        <Link isExternal color="teal.500" href={photographer}>
          {credit}
        </Link>{" "}
        via{" "}
        <Link isExternal color="teal.500" href={site}>
          Unsplash
        </Link>
      </Box>

      {!modal ? (
        <Stack gap={1.5} fontSize="0.7rem" textAlign="center">
          <Flex gap={3}>
            <Box>
              <b>Type:</b> {type}
            </Box>
            <Box>
              <b>Hypoallergenic: </b>
              {hypoallergenic ? "yes" : "no"}
            </Box>
            <Box>
              <b>Dietary Restrictions: </b>
              {diet.includes("none") ? (
                <span>✔️ {diet}</span>
              ) : (
                diet.map((restric) => (
                  <span key={`${id}${restric}`}>❌ {restric}</span>
                ))
              )}
            </Box>
          </Flex>

          <Flex gap={3}>
            {" "}
            <Box>
              <b>Height:</b> {height} cm
            </Box>
            <Box>
              <b>Weight:</b> {weight} kg
            </Box>
            <Box>
              <b>Breed: </b>
              {breed}
            </Box>
            <Box>
              <b>Color: </b>
              {color}
            </Box>
          </Flex>
          <Box>
            <b>Bio: </b>
            {bio.length > 0 ? <span>{bio}</span> : "No bio available"}
          </Box>
        </Stack>
      ) : null}

      <Flex gap={5} justifyContent="space-between">
        {modal ? (
          <PetModal
            updateInfo={updateInfo}
            thisPet={{
              // petId,
              id,
              name,
              height,
              weight,
              status,
              imageSource,
              modal,
              credit,
              photographer,
              site,
              bio,
              diet,
              breed,
              hypoallergenic,
              color,
              type,
            }}
          />
        ) : null}
      </Flex>
      <Stack alignItems="center" justifyContent="center">
        {isAdmin && !modal ? (
          <Flex gap={5}>
            <UpdatePetModal
              updateInfo={updateInfo}
              thisPet={{
                id,
                name,
                height,
                weight,
                status,
                imageSource,
                modal,
                credit,
                photographer,
                site,
                bio,
                diet,
                breed,
                hypoallergenic,
                color,
                type,
              }}
            />

            <DeleteAlert
              handleClick={() => deletePet.mutate(id)}
              isLoading={deletePet.isLoading}
              isUser={false}
            />
          </Flex>
        ) : null}

        {isLoggedIn && !modal ? (
          <Stack alignItems="center">
            <Flex gap={2} alignItems="center">
              {status === "available" && (
                <Button
                  bgColor="teal.100"
                  onClick={() => changeStatus("fostered")}
                >
                  Foster
                </Button>
              )}
              {status !== "available" && petIsAssignedToUser && (
                <Button
                  bgColor="orange.100"
                  onClick={() => changeStatus("available")}
                  isLoading={updateStatus.isLoading}
                >
                  Return Pet
                </Button>
              )}
              {status !== "adopted" && petIsAssignedToUser && (
                <Button
                  bgColor="green.100"
                  onClick={() => changeStatus("adopted")}
                

                >
                  Adopt
                </Button>
              )}
              {status === "available" && !petIsAssignedToUser && (
                <Button
                  bgColor="green.100"
                  onClick={() => changeStatus("adopted")}
                >
                  Adopt
                </Button>
              )}
            </Flex>
            <Flex alignItems="center" gap={3}></Flex>
          </Stack>
        ) : null}
        {!isLoggedIn && !modal ? (
          <Text color="red.300">
            Please login to foster or adopt this cutie!
          </Text>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default PetCard;
