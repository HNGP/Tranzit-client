import React from "react";
import { useState } from "react";
import { Box, Select, Button, Flex } from "@chakra-ui/react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Dropdown from "./common/Dropdown";
import { IconButton } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { MdSwapVert } from "react-icons/md";

const StationsSelect = (props) => {
  const STATION_LIST_QUERY = gql`
    query StationsQuery {
      stations {
        id
        title
      }
    }
  `;

  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [stationList, setStationList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const changeSrc = (event) => {
    setSource(parseInt(event.target.value, 10));
    event.preventDefault();
  };
  const changeDest = (event) => {
    setDestination(parseInt(event.target.value, 10));
    event.preventDefault();
  };
  const swap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
    console.log(source);
    console.log(destination);
  };
  const sendData = () => {
    props.runDijkstra({ variables: { source, destination } });
  };
  const onCompleteHandler = (data) => {
    const sortedStationList = data.stations.sort((st1, st2) =>
      st1.title > st2.title ? 1 : -1
    );
    setStationList(
      sortedStationList.map((station) => (
        <option key={station.id} value={station.id}>
          {station.title}
        </option>
      ))
    );
    setIsDisabled(!isDisabled);
  };
  return (
    <Flex
      direction="row"
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
      bgGradient="linear(to-br, rgba(255, 255, 255, 0.4), rgba(255, 255, 255,
      0.1))"
    >
      <Query query={STATION_LIST_QUERY} onCompleted={onCompleteHandler} />
      <form>
        <Flex direction="column">
          <Box m="3">
            <Select
              variant="filled"
              placeholder="From"
              name="src"
              height="34px"
              borderRadius="10px"
              isDisabled={isDisabled}
              onChange={changeSrc}
              value={source}
            >
              {stationList}
            </Select>
          </Box>
          <Box m="3">
            <Select
              variant="filled"
              placeholder="To"
              name="dest"
              height="34px"
              borderRadius="10px"
              isDisabled={isDisabled}
              onChange={changeDest}
              value={destination}
            >
              {stationList}
            </Select>
          </Box>
          <Box m="3">
            <Button
              isDisabled={!source || !destination}
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
          </Box>
        </Flex>
      </form>
      <Flex justify="end" marginTop="20%">
        <MdSwapVert color="#000000" onClick={swap} fontSize="25px" />
      </Flex>
    </Flex>
  );
};

export default StationsSelect;
