import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import AuthContext from "../../contexts/authContext";
import { useRef, useContext, useMemo } from "react";
import MenuItem from "./menuitem";
import routes from "../../Constants/routes";
import { HamburgerIcon } from "@chakra-ui/icons";
import SmallLogo from "../Logo/SmallLogo";

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { isLoggedIn } = useContext(AuthContext);

  const isAdmin = useMemo(
    () => isLoggedIn.accessLevel === "admin",
    [isLoggedIn]
  );

  const filterFunc = useMemo(() => {
    if (isAdmin) return (route) => route.protected || route.admin;
    if (isLoggedIn) return (route) => route.protected && !route.admin;
    return (route) => !route.protected;
  }, [isAdmin, isLoggedIn]);

  return (
    <>
      <IconButton
        onClick={onOpen}
        ref={btnRef}
        _hover={{ backgroundColor: "yellow.50" }}
        bgColor="white"
        aria-label="menu"
        icon={<HamburgerIcon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {" "}
            <SmallLogo />
          </DrawerHeader>
          <DrawerBody>
            <Stack gap={5}>
              {routes.filter(filterFunc).map((route) => (
                <MenuItem
                  key={route.path}
                  to={route.path}
                  label={route.label}
                  icon={route.icon}
                />
              ))}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
