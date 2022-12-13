import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  //   ModalHeader,
  //   ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Login from "./Login";
import SignUp from "./SignUp";

const LoginSignUpModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor={"white"}
        height="100%"
        padding={2}
        borderRadius={6}
        mr={15}
        w="fit-content"
        align="center"
        _hover={{ backgroundColor: "yellow.50" }}
      >
        Login/Sign Up
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Login</Tab>
                <Tab>Sign Up</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Login onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  <SignUp onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginSignUpModal;
