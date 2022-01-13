import { Box, Button, Flex, Select, setScript, Text } from "@chakra-ui/react";
import Router from "next/router";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdSwapVert } from "react-icons/md";
import useStationList from "../hooks/useStationList";
import RouteContext from "../context/routeContext";
import LocationIcon from "../public/location-pin.png";
import NearestStationHome from "../components/NearestStationHome";

const StationsSelect = (props) => {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [stationList, setStationList] = useState([]);
  const [isLoading, loadingActions] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { setRouteData } = useContext(RouteContext);
  let { latitude, longitude } = props;
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  const { data } = useStationList();

  const router = useRouter();

  useEffect(() => {
    if (data) {
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
    }
  }, [data]);

  useEffect(() => {
    let sourceParam = router.query.src;
    let destinationParam = router.query.des;
    setSource(parseInt(sourceParam, 10));
    setDestination(parseInt(destinationParam, 10));
  }, []);

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
  };
  const sendData = () => {
    setRouteData((prevState) => ({
      ...prevState,
      loading: !prevState.loading,
    }));
    props.findShortestPath(source, destination);
  };

  return (
    <>
      <Flex
        position={"relative"}
        direction="row"
        maxW="sm"
        borderWidth="1px"
        w="22.5%"
        minW="420px" //250
        minH="250px"
        borderRadius="15px"
        overflow="hidden"
        style={{
          backdropFilter: "blur(10rem)",
          boxShadow: "6px 6px 20px rgba(122, 122, 122, 0.212)",
        }}
        // bgGradient="linear(to-br, rgba(255, 255, 255, 0.4), rgba(255, 255, 255,
        //   0.1))"
        zIndex={1}
      >
        <form>
          <Flex direction="column">
            <NearestStationHome latitude={latitude} longitude={longitude} />
            <Box m="3">
              <Select
                variant="filled"
                placeholder="From"
                name="src"
                height="34px"
                width="120%"
                bg="white"
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
                bg="white"
                width="120%"
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
                isLoading={props.isLoading}
                isDisabled={!source || !destination}
                bgColor="gray.500"
                color="white"
                width="120%"
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
        <Flex justify="end" marginTop="25%" marginLeft="12%">
          <MdSwapVert color="#000000" onClick={swap} fontSize="25px" />
        </Flex>
      </Flex>
    </>
  );
};

export default StationsSelect;
