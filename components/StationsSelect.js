import React from "react";
import { useState } from "react";
import { Box, Text, Select, Button } from "@chakra-ui/react";

const StationsSelect = (props) => {
  const stations = [];
  for (var i = 0; i < props.stationsList.path.length; i++) {
    stations.push(
      <option value={props.stationsList.path[i]}>
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
      minW="200px"
      borderRadius="lg"
      overflow="hidden"
      //   bgGradient="linear(to-r, #FFFFFF, #DFDFE0)"
    >
      <form>
        <Box m="3">
          <Select
            variant="filled"
            placeholder="From"
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
            onChange={changeDest}
          >
            {stations}
          </Select>
        </Box>
        <Box m="3">
          <Button colorScheme="blue" size="md" onClick={sendData}>
            Submit
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
