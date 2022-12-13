import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  Flex,
} from "@chakra-ui/react";
import PetCard from "./PetCard";

const PetModal = ({ thisPet, updateInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor={"white"}
        padding={2}
        borderRadius={6}
        mr={15}
        w="fit-content"
        align="center"
        // transition="background-color 100ms ease"
        _hover={{ backgroundColor: "green.100", transform: "scale(1.5)" }}
        backgroundColor="yellow.200"
      >
        See More{" "}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
        <ModalOverlay />

        <ModalContent w="fit-content" h="fit-content">
          <Flex width="100%" alignItems="flex-start" justifyContent="left">
            <ModalCloseButton fontSize="x-large" textAlign="center">
              🔙
            </ModalCloseButton>
          </Flex>

          <PetCard
            id={thisPet.id}
            bio={thisPet.bio}
            diet={thisPet.diet}
            breed={thisPet.breed}
            hypoallergenic={thisPet.hypoallergenic}
            height={thisPet.height}
            name={thisPet.name}
            weight={thisPet.weight}
            credit={thisPet.credit}
            photographer={thisPet.photographer}
            status={thisPet.status}
            imageSource={thisPet.imageSource}
            modal={false}
            color={thisPet.color}
            type={thisPet.type}
            updateInfo={updateInfo}
            // deletePet={deletePet}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default PetModal;
