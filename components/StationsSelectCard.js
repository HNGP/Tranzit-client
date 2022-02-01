import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Select } from "@chakra-ui/react";
import { AutoComplete, message } from "antd";
import { useRouter } from "next/router";
import { MdSwapVert } from "react-icons/md";
import NearestStationHome from "../components/NearestStationHome";
import RouteContext from "../context/routeContext";
import useStationList from "../hooks/useStationList";

const StationsSelect = (props) => {
  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});
  const [stationList, setStationList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const { setRouteData } = useContext(RouteContext);
  let { latitude, longitude } = props;
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  const { data } = useStationList();

  const router = useRouter();

  useEffect(() => {
    let sourceParam = router.query.src;
    let destinationParam = router.query.des;
    if (data) {
      const sortedStationList = data.stations.sort((st1, st2) =>
        st1.title > st2.title ? 1 : -1
      );
      setStationList(
        sortedStationList.map((station) => {
          if (sourceParam == station.id) {
            setSource({
              label: station.title,
              value: station.id,
            });
          }
          if (destinationParam == station.id) {
            setDestination({
              label: station.title,
              value: station.id,
            });
          }
          return {
            label: station.title,
            value: station.id,
          };
        })
      );
      setIsDisabled(!isDisabled);
    }
  }, [data]);

  const changeSrc = (data) => {
    if (!isNaN(data) && data !== "")
      setSource(stationList.find(({ value }) => value === data));
    else setSource({ label: data, value: "" });
  };
  const changeDest = (data) => {
    if (!isNaN(data) && data !== "")
      setDestination(stationList.find(({ value }) => value === data));
    else setDestination({ label: data, value: "" });
  };
  const swap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };
  const sendData = () => {
    if (!source.value || !destination.value) {
      message.error("Please select correct source and destination stations");
      return;
    }
    setRouteData((prevState) => ({
      ...prevState,
      loading: !prevState.loading,
    }));
    props.findShortestPath(
      parseInt(source.value, 10),
      parseInt(destination.value, 10)
    );
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
        zIndex={1}
      >
        <form>
          <Flex direction="column">
            <NearestStationHome latitude={latitude} longitude={longitude} />
            <Box m="3">
              <AutoComplete
                value={source.label}
                style={{ width: 360 }}
                dropdownMatchSelectWidth
                options={stationList}
                onSelect={changeSrc}
                onSearch={changeSrc}
                placeholder="From"
                filterOption={(inputValue, option) =>
                  option.label
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
              {/* <Select
                variant="filled"
                placeholder="From"
                name="src"
                height="34px"
                width="360px"
                bg="white"
                borderRadius="10px"
                isDisabled={isDisabled}
                onChange={changeSrc}
                value={source}
              >
                {stationList}
              </Select> */}
            </Box>
            <Box m="3">
              <AutoComplete
                value={destination.label}
                style={{ width: 360 }}
                options={stationList}
                onSelect={changeDest}
                onSearch={changeDest}
                placeholder="To"
                filterOption={(inputValue, option) =>
                  option.label
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
              {/* <Select
                variant="filled"
                placeholder="To"
                name="dest"
                height="34px"
                bg="white"
                width="360px"
                borderRadius="10px"
                isDisabled={isDisabled}
                onChange={changeDest}
                value={destination}
              >
                {stationList}
              </Select> */}
            </Box>
            <Box m="3">
              <Button
                isLoading={props.isLoading}
                isDisabled={!source.label || !destination.label}
                bgColor="gray.500"
                color="white"
                width="390px"
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
        <Flex justify="end" marginTop="25%" marginLeft="-32px">
          <MdSwapVert
            style={{ cursor: "pointer" }}
            color="#000000"
            onClick={swap}
            fontSize="25px"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default StationsSelect;
