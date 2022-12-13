import { Spinner, Stack } from "@chakra-ui/react";
import usePets from "../../../hooks/usePets";
import PetList from "../../Pets/PetList";
import SearchComponent from "./SearchComponent";

const Search = () => {
  const { setFilter, data, refetchPets, isFetching: isLoading } = usePets();

  return (
    <Stack zIndex={0} alignItems="center" justifyContent="center">
      <SearchComponent
        refetchPets={refetchPets}
        submitHandler={(v) => setFilter(v)}
      />
      {isLoading ? <Spinner size="xl" /> : <PetList data={data} />}
    </Stack>
  );
};

export default Search;
