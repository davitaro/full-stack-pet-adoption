import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "../Config/axios";
import CONFIG_URLS from "../Config/urls";

export default function useAdmin() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const allUsersQuery = useQuery(
    ["allusers"],
    async () => {
      const { data } = await axios.get(`${CONFIG_URLS.base}/admin/users`);
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 60 * 60 * 10,
      staleTime: 60 * 60 * 20,
      structuralSharing: false,
    },
    {
      initialData: [],
    }
  );

  const deleteUser = useMutation(
    (userId) => axios.delete(`${CONFIG_URLS.base}/admin/${userId}`),
    {
      onSuccess: () => {
        toast({
          title: "Success. 😍",
          position: "top",
          description: `You've successfully deleted this user. `,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        queryClient.refetchQueries(["allusers"], { exact: false });
      },
    }
  );

  return {
    allUsers: allUsersQuery?.data || [],
    allUsersQuery,
    deleteUser,
  };
}
