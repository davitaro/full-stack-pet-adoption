import { useMutation, useQueryClient } from "react-query";
import axios from "../Config/axios";
import CONFIG_URLS from "../Config/urls";

export const useUser = () => {
  const queryClient = useQueryClient();

  const updateInfo = useMutation(
    async (info) => axios.put(`${CONFIG_URLS.base}/users`, info),
    {
      onMutate: (info) => {
        // console.log("info sent", info);
      },
      onSuccess: (response) => {
        queryClient.refetchQueries(["user"]);
      },
    }
  );

  return {
    updateInfo,
    // data,
  };
};
