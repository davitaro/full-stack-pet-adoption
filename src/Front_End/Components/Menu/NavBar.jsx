import { Flex, Button, Text } from "@chakra-ui/react";
import MenuDrawer from "./MenuDrawer";
import MenuItem from "./menuitem";
import routes from "../../Constants/routes";
import AuthContext from "../../contexts/authContext";
import { useContext, useMemo } from "react";
import SmallLogo from "../Logo/SmallLogo";
import LoginSignUpModal from "../Pages/LoginandSignup/loginsignupmodal";
import { useNavigate } from "react-router-dom";

const NavBar = ({ mt }) => {
  const { isLoggedIn, signout } = useContext(AuthContext);
  const navigate = useNavigate();

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
    <Flex
      as="header"
      position="fixed"
      w="100%"
      h="50px"
      backgroundColor="white"
      backdropFilter="saturate(180%) blur(5px)"
      borderBottomWidth={5}
      borderBottomColor="yellow.100"
      gap={20}
      pl={10}
      alignItems="center"
      justifyContent="left"
      zIndex={10}
    >
      <Flex align="center" gap={10}>
        <MenuDrawer />
        <SmallLogo />
        {isLoggedIn ? (
          <Flex alignItems="center" gap={5}>
            <Flex gap={2}>
              Welcome,{" "}
              <Text fontFamily="fantasy">{isLoggedIn.firstName} 🦄</Text>{" "}
            </Flex>
            <Button
              onClick={() => {
                signout.mutate();
                navigate("/");
              }}
            >
              Log Out
            </Button>{" "}
          </Flex>
        ) : (
          <LoginSignUpModal />
        )}
      </Flex>

      <Flex
        gap={[5, 10, 15, 20]}
        width="fit-content"
        display={["none", "none", "flex", "flex"]}
        align="center"
      >
        {routes.filter(filterFunc).map((route) => (
          <MenuItem
            key={route.path}
            to={route.path}
            label={route.label}
            // icon={route.icon}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default NavBar;
