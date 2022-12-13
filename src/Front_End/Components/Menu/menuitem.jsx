import { Flex } from "@chakra-ui/react";
import { Link, useMatch } from "react-router-dom";

const MenuItem = ({ to, label, icon = null }) => {
  const match = useMatch(to);
  return (
    <Flex
      gap={5}
      as={Link}
      to={to} //href
      bgColor={match ? "yellow.100" : "whiteAlpha.900"}
      height="100%"
      padding={2}
      borderRadius={6}
      mr={15}
      w="fit-content"
      align="center"
      // transition="background-color 100ms ease"
      _hover={{ backgroundColor: "yellow.50" }}
    >
      {icon}
      {label}
    </Flex>
  );
};

export default MenuItem;
