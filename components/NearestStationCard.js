import React from "react";
import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import LocationIcon from "../public/location-pin.png";

const NearestStationCard = (props) => {
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
      <Box m="3">
        <Box style={{ marginTop: "20px", marginLeft: "20px" }}>
          <Image src={LocationIcon} width="60px" height="75px" />
        </Box>
        <Text m="3" mt="0" mb="0" pt="2">
          Nearest Station
        </Text>
        <Text ml="3" mb="0" fontSize="4xl" pb="5" lineHeight="45px">
          {props.nearestStation}
        </Text>
      </Box>
    </Box>
  );
};

export default NearestStationCard;
