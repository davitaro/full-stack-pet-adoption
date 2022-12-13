import CONFIG_URLS from "../Config/urls";
import axios from "../Config/axios";
import { useMutation, useQueryClient } from "react-query";
import usePets from "./usePets";
import { useToast } from "@chakra-ui/react";

const usePet = (petId) => {
  const { refetchPets } = usePets();
  const toast = useToast();

  const queryClient = useQueryClient();

  // const petQuery = useQuery(["pet", petId], async () => {
  // const { data } = await axios.get(`${CONFIG_URLS.base}/pets/${petId}`);
  //  return data;
  // });

  const updateStatus = useMutation(
    (d) => axios.post(`${CONFIG_URLS.base}/pets/${petId}/status`, d),
    {
      onSuccess: () => {
        toast({
          title: "Woohoo 😍",
          position: "top",
          description: `You've successfully changed the status of this pet! `,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        queryClient.refetchQueries(["user"], { exact: false });
        refetchPets();
      },
      onError: () => {
        toast({
          title: "Oops 😞",
          position: "top",
          description: `This action was not successful. Please refresh and try again. `,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        queryClient.refetchQueries(["user"], { exact: false });
        refetchPets();
      },
    }
  );

  const updatePet = useMutation(
    (petinfo) => axios.put(`${CONFIG_URLS.base}/pets/${petId}`, petinfo),
    {
      onMutate: (petinfo) => {},
      onSuccess: (response) => {
        refetchPets();
        toast({
          position: "top",
          title: "Pet updated!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const deletePet = useMutation(
    (petId) => axios.delete(`${CONFIG_URLS.base}/pets/${petId}`),
    {
      onSuccess: () => {
        toast({
          title: "Success. 😍",
          position: "top",
          description: `You've successfully deleted this pet. `,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        queryClient.refetchQueries(["user"], { exact: false });

        refetchPets();
      },
    }
  );

  return {
    // petQuery,
    updateStatus,
    updatePet,
    deletePet,
  };
};

export default usePet;
