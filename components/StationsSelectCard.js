import React from "react";
import { useState } from "react";
import { Box, Text, Select, Button } from "@chakra-ui/react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const StationsSelect = (props) => {
  const STATION_LIST_QUERY = gql`
    query StationsQuery {
      stations {
        id
        title
      }
    }
  `;

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
  const sendData = () => {
    props.sendStateSrc(source);
    props.sendStateDest(destination);
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
      bgGradient="linear(to-br, rgba(255, 255, 255, 0.4), rgba(255, 255, 255,
      0.1))"
    >
      <Query query={STATION_LIST_QUERY} onCompleted={onCompleteHandler} />
      <form>
        <Box m="3">
          <Select
            variant="filled"
            placeholder="From"
            borderRadius="10px"
            height="34px"
            name="src"
            isDisabled={isDisabled}
            onChange={changeSrc}
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
      </form>
    </Box>
  );
};

export default StationsSelect;
