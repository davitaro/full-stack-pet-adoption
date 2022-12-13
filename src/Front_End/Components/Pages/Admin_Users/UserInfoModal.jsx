import {
  useDisclosure,
  Text,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  //   ModalHeader,
  //   ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalHeader,
  Stack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import DeleteAlert from "../../Alerts/Alert,";
import UserPetCard from "./UserPetCard";

const moment = require("moment");

const UserInfoModal = ({ user, deleteUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const allOwnedPets = useMemo(() => {
    return [...user.fosteredPets, ...user.adoptedPets];
  }, [user]);
  return (
    <>
      <Button
        onClick={onOpen}
        bgColor={"white"}
        height="100%"
        padding={2}
        borderRadius={6}
        w="fit-content"
        align="center"
        _hover={{ backgroundColor: "yellow", transform: "scale(1.5)" }}
      >
        🤸 More Info{" "}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent maxW="56rem">
          <ModalHeader fontSize="2xl" w="100%">
            <Flex gap={4}>
              <Text>🤹 User Info: </Text>
              <Text color="pink.500">
                {user.firstName} {user.lastName}
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%">
            <Stack>
              <Stack>
                <Flex gap={5}>
                  <Text>
                    <b>Access Level: </b>
                    {user.accessLevel}{" "}
                  </Text>
                  <Text>
                    <b>Email: </b>
                    {user.email}
                  </Text>
                  <Text>
                    <b>Phone: </b>
                    {user.phone}
                  </Text>
                </Flex>
                <Text>
                  <b>Bio: </b>
                  {user.bio ? (
                    user.bio
                  ) : (
                    <i>
                      Every user has a story. However, this user has not yet
                      created a bio.
                    </i>
                  )}
                </Text>

                <Flex gap={5}>
                  <Flex>
                    <Box>
                      <b>Account created:</b>{" "}
                      {moment(user?.createdAt).fromNow()}
                    </Box>
                  </Flex>
                  <Flex>
                    <Box>
                      <b>Last updated:</b> {moment(user?.updatedAt).fromNow()}
                    </Box>
                  </Flex>
                </Flex>
              </Stack>
              <Box>
                <b>Saved Pets: </b>
                <Flex gap={3}>
                  {user.savedPets?.map((pet) => (
                    <UserPetCard
                      key={pet._id}
                      name={pet.name}
                      status={pet.status}
                      imageSource={pet.image}
                      credit={pet.credit}
                      site={pet.site}
                      photographer={pet.photographer}
                      type={pet.type}
                    />
                  ))}
                  {user.savedPets.length === 0 ? (
                    <Text>No Pets to Display</Text>
                  ) : null}
                </Flex>
              </Box>

              <Box>
                <b>All Owned Pets: </b>
                <Flex gap={3}>
                  {allOwnedPets?.map((pet) => (
                    <UserPetCard
                      key={pet._id}
                      name={pet.name}
                      status={pet.status}
                      imageSource={pet.image}
                      credit={pet.credit}
                      site={pet.site}
                      photographer={pet.photographer}
                      type={pet.type}
                    />
                  ))}
                  {allOwnedPets.length === 0 ? (
                    <Text>No Pets to Display</Text>
                  ) : null}
                </Flex>
              </Box>
            </Stack>
            <Flex width="100%" justifyContent="right" alignItems="flex-end">
              <DeleteAlert
                handleClick={() => {
                  deleteUser.mutate(user._id);
                  onClose();
                }}
                isUser={true}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserInfoModal;
