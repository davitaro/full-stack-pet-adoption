import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const { default: UsersList } = require("./UsersList");

const UsersListModal = ({allUsers, deleteUser, allUsersQuery, isLoading}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        bgColor={"white"}
        height="100%"
        padding={10}
        borderRadius={6}
        w="100%"
        align="center"
        _hover={{ backgroundColor: "lightGreen" }}
        fontSize="2xl"
      >
        🤸 View All Users{" "}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registered Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UsersList allUsers={allUsers} deleteUser={deleteUser} allUserQuery={allUsersQuery} isLoading={isLoading}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UsersListModal;
