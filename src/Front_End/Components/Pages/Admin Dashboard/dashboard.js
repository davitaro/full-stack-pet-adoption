import AddPetModal from "../../Pets/AddPetModal";
import { Box, Heading, Flex, Stack, Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import AuthContext from "../../../contexts/authContext";
import UsersListModal from "../Admin_Users/UsersListModal";
import PetList from "../../Pets/PetList";
import usePets from "../../../hooks/usePets";
import AdminStats from "./adminStats";
import useAdmin from "../../../hooks/useAdmin";

const Dashboard = () => {
  const { isLoggedIn: userInfo } = useContext(AuthContext);
  const { data, isFetching } = usePets();
  const [seeAllPets, setSeeAllPets] = useState(false);
  const { allUsers, deleteUser, allUsersQuery } = useAdmin();

  return (
    <Stack
      alignItems="center"
      justifyContent="flex-start"
      as="main"
      position="fixed"
      bgColor="white"
      w="100%"
      h="100vh"
      p={100}
      pb={20}
      pt={50}
      overflow="scroll"
    >
      <Flex justifyContent="center" gap={1} pb={5} mt={50} w="100%">
        <Heading mb={4} display="inline">
          Welcome to your Admin Dashboard,{" "}
        </Heading>
        <Heading display="inline" color="pink.500">
          {userInfo.firstName} {userInfo.lastName}!
        </Heading>
      </Flex>
        <AdminStats
          totalPets={data.length}
          totalUsers={allUsers.length}
          isLoadingUsers={allUsersQuery.isLoading}
          isLoadingPets={isFetching}
        />{" "}
      <Stack alignItems="flex-start" justifyContent="flex-start" w='100%'>
        <Stack bgColor="hotpink" p={3} borderRadius={10} w="100%" gap={10}>
          <Heading pl={2} color="pink.50">
            Tasks
          </Heading>
          <Flex
            gap={10}
            flexFlow="wrap"
            alignItems="center"
            justifyContent="space-around"
          >
            <Box p={4} pb={5} bgColor="yellow.300" borderRadius={10}>
              {" "}
              <AddPetModal />
            </Box>
            <Box p={4} pb={5} bgColor="yellow.300" borderRadius={10}>
              <UsersListModal
                allUsers={allUsers}
                deleteUser={deleteUser}
                allUsersQuery={allUsersQuery}
                isLoading={allUsersQuery.isLoading}
              />
            </Box>
            <Box p={4} bgColor="yellow.300" borderRadius={10}>
              {" "}
              <Button
                p={10}
                w="100%"
                h="100%"
                bgColor="white"
                fontSize="2xl"
                _hover={{ bgColor: "lightgreen", opacity: 1 }}
                onClick={() => setSeeAllPets(!seeAllPets)}
              >
                {!seeAllPets
                  ? "Display Pet List to View & Edit"
                  : "Hide Pet List"}
              </Button>
            </Box>
          </Flex>
        </Stack>

        {seeAllPets && (
          <Box p={2} bgColor="hotpink" borderRadius={10} w="100%">
            <Heading pl={2} color="pink.50">
              All Pets
            </Heading>
            <Heading pl={2} pb={2} size="sm" color="pink.100">
              Click on a pet to view details, update, or delete.
            </Heading>
            <PetList data={data} />
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
export default Dashboard;
