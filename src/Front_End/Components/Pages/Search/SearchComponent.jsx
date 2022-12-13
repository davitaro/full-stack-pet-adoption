import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Select,
  Flex,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { useState, useMemo, useCallback } from "react";

const SearchComponent = ({ submitHandler, refetchPets }) => {
  const [filterLines, setFilterLines] = useState([]);

  const isSubmitDisabled = useMemo(
    () =>
      filterLines.reduce((acc, currLine) => {
        if (!currLine.value) return true;
        return acc;
      }, false),
    [filterLines]
  );

  const errors = useMemo(() => {
    const obj = {};
    filterLines.forEach((line) => {
      //validations
      if (!line.value) {
        obj[line.id] = "value";
      }
    });
    return obj;
  }, [filterLines]);

  const onSubmit = useCallback(() => {
    submitHandler(filterLines);
    //refetchPets();
    refetchPets();
  }, [filterLines, submitHandler, refetchPets]);

  const addLine = useCallback(() => {
    setFilterLines((curr) => [
      ...curr,
      {
        id: uuidv4(),
        field: "type",
        operator: "eq",
        value: "",
      },
    ]);
  }, []);

  const removeLine = useCallback((lineId) => {
    setFilterLines((curr) => curr.filter((l) => l.id !== lineId));
  }, []);

  const updateLine = useCallback(
    (lineId, key, value) => {
      const lines = JSON.parse(JSON.stringify(filterLines));
      const line = lines.find((l) => l.id === lineId);
      line[key] = value;
      setFilterLines(lines);
    },
    [filterLines]
  );

  const reset = useCallback(() => {
    setFilterLines([]);
    submitHandler([]);
  }, [submitHandler]);

  return (
    <Box w="100%" d="flex" justifyContent="center" zIndex={0}>
      <Stack
        spacing={3}
        justifyContent="top"
        position="relative"
        mt="50"
        bgColor="white"
        w="80%"
        // h="100vh"
        p={5}
        // overflow="scroll"
      >
        {" "}
        <Heading alignSelf="center">Search for a Pet 👇</Heading>
        <Button bgColor="yellow.100" p={4} onClick={addLine}>
          ➕ Add Search Query
        </Button>
        {filterLines.map((line) => (
          <FilterLine
            key={line.id}
            line={line}
            updateLine={updateLine}
            errors={errors}
            removeLine={removeLine}
          />
        ))}
        {filterLines.length > 0 && (
          <Flex gap={10} alignItems="center" justifyContent="center">
            <Button
              isDisabled={isSubmitDisabled}
              onClick={onSubmit}
              bgColor="green.100"
            >
              Search
            </Button>
            <Button bgColor="pink.100" onClick={reset}>
              Reset Search
            </Button>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};

const FilterLine = ({ updateLine, line, errors, removeLine }) => {
  const OperatorTemplate = useMemo(() => {
    if (line.field === "type") {
      return (
        <Select
          value={line.operator}
          onChange={(event) =>
            updateLine(line.id, "operator", event.target.value)
          }
        >
          <option value="eq">is a</option>
          <option value="neq">is not a </option>
        </Select>
      );
    }

    if (line.field === "status") {
      return (
        <Select
          value={line.operator}
          onChange={(event) =>
            updateLine(line.id, "operator", event.target.value)
          }
        >
          <option value="eq">is</option>
          <option value="neq">is not</option>
        </Select>
      );
    }

    if (line.field === "name") {
      return (
        <Select
          value={line.operator}
          onChange={(event) =>
            updateLine(line.id, "operator", event.target.value)
          }
        >
          <option value="eq">is</option>
          <option value="neq">is not</option>
          <option value="con">contains</option>
        </Select>
      );
    }

    if (line.field === "height" || line.field === "weight") {
      return (
        <Select
          value={line.operator}
          onChange={(event) =>
            updateLine(line.id, "operator", event.target.value)
          }
        >
          <option value="eq">is exactly</option>
          <option value="more">is more than</option>
          <option value="less">is less than</option>
        </Select>
      );
    }
  }, [line.field, line.id, line.operator, updateLine]);

  const ValueTemplate = useMemo(() => {
    if (line.field === "type") {
      return (
        <Select
          value={line.value}
          onChange={(event) => updateLine(line.id, "value", event.target.value)}
        >
          <option value="" disabled>
            Select Type
          </option>
          <option value="dog">🐩 dog</option>
          <option value="cat"> 🐈 cat</option>
          <option value="rabbit">🐇 rabbit</option>
        </Select>
      );
    }

    if (line.field === "status") {
      return (
        <Select
          value={line.value}
          onChange={(event) => updateLine(line.id, "value", event.target.value)}
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="available"> 🤗 Available</option>
          <option value="fostered"> 👐 Fostered</option>
          <option value="adopted">💕 Adopted</option>
        </Select>
      );
    }

    if (line.field === "name") {
      return (
        <Input
          isInvalid={errors?.[line.id] === "value"}
          errorBorderColor="red.100"
          placeholder="Name"
          value={line.value}
          onChange={(event) => updateLine(line.id, "value", event.target.value)}
        />
      );
    }

    if (line.field === "height" || line.field === "weight") {
      return (
        <Input
          isInvalid={errors?.[line.id] === "value"}
          errorBorderColor="red.100"
          value={line.value}
          placeholder="Enter a number"
          onChange={(event) => updateLine(line.id, "value", event.target.value)}
          type="number"
        />
      );
    }

    return (
      <Input
        isInvalid={errors?.[line.id] === "value"}
        errorBorderColor="red.100"
        value={line.value}
        onChange={(event) => updateLine(line.id, "value", event.target.value)}
      />
    );
  }, [line, errors, updateLine]);

  return (
    <Box>
      <Flex key={line.id} gap={3}>
        <Select
          value={line.field}
          onChange={(event) => updateLine(line.id, "field", event.target.value)}
        >
          <option value="type">Type</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
          <option value="height">Height (cm)</option>
          <option value="weight">Weight (kg)</option>
        </Select>
        {OperatorTemplate}
        {ValueTemplate}
        <Button
          bgColor="white"
          color="white"
          onClick={() => removeLine(line.id)}
        >
          🗑️
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchComponent;
