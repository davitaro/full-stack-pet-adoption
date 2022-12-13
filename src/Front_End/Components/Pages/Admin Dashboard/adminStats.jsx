import { Box, Heading, Flex,  Spinner } from "@chakra-ui/react";
import CountUp from "react-countup";

const AdminStats = ({
  totalPets,
  totalUsers,
  isLoadingUsers,
  isLoadingPets,
}) => {
  // Start counting, do this on DOM ready or with Waypoints.
  <CountUp end={totalPets} />;

  return (
    <Box bgColor="hotpink" p={3} borderRadius={10} w="100%" gap={10}>
      <Heading pl={2} color="pink.50">
        Admin Stats
      </Heading>
      <Flex justifyContent='space-around'>
        <Box pl={2} pb={2} color="pink.100" fontSize='x-large'>
          Total Pets:{" "}
          {isLoadingPets ? <Spinner /> : <CountUp end={totalPets} />}
        </Box>
        <Box pl={2} pb={2} fontSize='x-large' color="pink.100">
          Total Users:{" "}
          {isLoadingUsers ? <Spinner /> : <CountUp end={totalUsers} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminStats;
