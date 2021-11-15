import React from "react";
import { useState } from "react";
import { Box, Text, Select, Button } from "@chakra-ui/react";

const StationsSelect = (props) => {
  const stations = [];
  for (var i = 0; i < props.stationsList.path.length; i++) {
    stations.push(
      <option
        key={props.stationsList.path[i]}
        value={props.stationsList.path[i]}
      >
        {props.stationsList.path[i]}
      </option>
    );
  }

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const changeSrc = (event) => {
    setSource(event.target.value);
    event.preventDefault();
  };
  const changeDest = (event) => {
    setDestination(event.target.value);
    event.preventDefault();
  };
  const sendData = () => {
    props.sendStateSrc(source);
    props.sendStateDest(destination);
  };
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      w="22.5%"
      minW="250px"
      borderRadius="15px"
      overflow="hidden"
      style={{
        backdropFilter: "blur(10rem)",
        boxShadow: "6px 6px 20px rgba(122, 122, 122, 0.212)",
      }}
      bgGradient="linear(to-br, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))"
    >
      <form>
        <Box m="3">
          <Select
            variant="filled"
            placeholder="From"
            borderRadius="10px"
            height="34px"
            name="src"
            onChange={changeSrc}
          >
            {stations}
          </Select>
        </Box>
        <Box m="3">
          <Select
            variant="filled"
            placeholder="To"
            name="dest"
            height="34px"
            borderRadius="10px"
            onChange={changeDest}
          >
            {stations}
          </Select>
        </Box>
        <Box m="3">
          <Button
            // boxShadow="1px 1px 30px rgba(122, 122, 122, 0.212)"
            bgColor="gray.500"
            color="white"
            width="100%"
            fontSize="20px"
            fontWeight="400"
            size="md"
            onClick={sendData}
          >
            Calculate Route
          </Button>
          {/* <Button isLoading loadingText="Calculating" colorScheme="blue">
            Submit
          </Button> */}
        </Box>
      </form>
    </Box>
  );
};

export default StationsSelect;
