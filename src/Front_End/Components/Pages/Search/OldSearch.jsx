import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Select,
  Flex,
  Input,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Stack,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import usePets from "../../../hooks/usePets";
import PetList from "../../Pets/PetList";

const OldSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [nameValue, setNameValue] = useState("");

  const { setSearchByName, searchByName } = usePets();

  const handleClick = () => {
    setSearchByName(nameValue);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const changeSearchType = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  return (
    <Box w="100%" d="flex" justifyContent="center">
      <Stack
        spacing={3}
        justifyContent="top"
        position="fixed"
        mt="50"
        bgColor="white"
        w="80%"
        h="100vh"
        p={5}
        overflow="scroll"
      >
        {" "}
        <Heading alignSelf="center">Search for a Pet</Heading>
        <Flex gap={5} alignItems="flex-end" justifyContent="center">
          <FormLabel>Type</FormLabel>
          <Select variant="flushed" size="lg">
            <option value="dog">🐩 dog</option>
            <option value="cat"> 🐈 cat</option>
            <option value="rabbit">🐇 rabbit</option>
            <option value="hamster">🐹 hamster</option>
            <option value="fish"> 🐠 fish</option>
          </Select>
        </Flex>
        {isAdvancedSearch ? (
          <Stack spacing={3}>
            <Select variant="flushed" size="lg" placeholder="Adoption Status">
              <option value="available_for_adoption">
                available for adoption
              </option>
              <option value="currently_adopted">currently adopted</option>
            </Select>

            <Input
              variant="flushed"
              placeholder="Pet Name"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
            ></Input>

            <Stack alignItems="center" justifyContent="center">
              <Flex gap={10} alignItems="center">
                <FormLabel fontSize={10}>min weight (kg)</FormLabel>
                <NumberInput defaultValue={0} min={0} max={100}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <FormLabel fontSize={10}>max weight (kg)</FormLabel>
                <NumberInput defaultValue={100} min={0} max={100}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>

              <Flex gap={10} alignItems="center">
                <FormLabel fontSize={10}>min height (cm)</FormLabel>
                <NumberInput defaultValue={0} min={0} max={100}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <FormLabel fontSize={10}>max height(cm)</FormLabel>
                <NumberInput defaultValue={100} min={0} max={100}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </Stack>
          </Stack>
        ) : null}
        <Flex pt={5} gap={10} justifyContent="center">
          <Button
            onClick={changeSearchType}
            w="fit-content"
            p={2}
            d="flex"
            gap={2}
            bgColor={isAdvancedSearch ? "yellow" : "teal"}
          >
            {isAdvancedSearch ? "Basic Search" : "Advanced Search"}{" "}
          </Button>
          <Button
            isLoading={isLoading}
            onClick={handleClick}
            w="fit-content"
            p={2}
            d="flex"
            gap={2}
          >
            Search <SearchIcon />
          </Button>
        </Flex>
        <Stack>
          {" "}
          <PetList />
        </Stack>
      </Stack>
    </Box>
  );
};

export default OldSearch;
