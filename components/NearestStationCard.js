import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import LocationIcon from "../public/location-pin.png";
import { parse } from "graphql";

const NearestStationCard = (props) => {
  let { latitude, longitude } = props;
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);
  const NEAREST_STATION_QUERY = gql`
    query nearestStationQuery($latitude: Float, $longitude: Float) {
      nearestStation(latitude: $latitude, longitude: $longitude) {
        nearestStation
      }
    }
  `;
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
        {latitude && longitude ? (
          <Query
            query={NEAREST_STATION_QUERY}
            variables={{ latitude, longitude }}
          >
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <Text ml="3" mb="0" fontSize="4xl" pb="5" lineHeight="45px">
                    Loading....
                  </Text>
                );
              if (error) {
                console.log(error);
              }

              return (
                <Text ml="3" mb="0" fontSize="4xl" pb="5" lineHeight="45px">
                  {data.nearestStation.nearestStation}
                </Text>
              );
            }}
          </Query>
        ) : (
          <Text ml="3" mb="0" fontSize="4xl" pb="5" lineHeight="45px">
            Loading....
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default NearestStationCard;
