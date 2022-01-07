import Head from "next/head";
import Image from "next/image";
import React from "react";
import Fare from "../components/FareCard";
import Navbar from "../components/Navbar";
import StationsSelect from "../components/StationsSelectCard";
import { Stations } from "../components/routeSample";
import { useState, useEffect } from "react";
import axios from "axios";
import useGeolocation from "../hooks/useGeoLocation";
import gql from "graphql-tag";
import { useLazyQuery } from "react-apollo";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Slide,
  Box,
  VStack,
  Badge,
  Grid,
  GridItem,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { Steps } from "antd";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { sortedLastIndex, truncate } from "lodash";
import backgroundImage from "../public/background.png";
import RouteCard from "../components/RouteCard";
import NearestStationCard from "../components/NearestStationCard";

const ROUTE_QUERY = gql`
  query routeQuery($source: Int, $destination: Int) {
    route(source: $source, destination: $destination) {
      distance
      stationsList {
        station
        lines
      }
      fare
      time
    }
  }
`;

export default function RoutePage() {
  const location = useGeolocation();
  const [routeData, setRouteData] = useState({
    fare: null,
    stationsList: [],
    time: null,
  });

  const [runDijkstra, { loading, error, data }] = useLazyQuery(ROUTE_QUERY);

  const onClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (data) {
      const { fare, stationsList, time } = data.route;
      setRouteData({
        fare,
        stationsList,
        time,
      });
    }
  }, [data]);

  return (
    <div>
      <Navbar />
      <Container className="layout" maxW="container.xl" centerContent ml={0}>
        <SimpleGrid columns={2} spacing={3} ml={50}>
          <VStack width="100%" spacing={3} ml={150}>
            <StationsSelect runDijkstra={runDijkstra} />
            <NearestStationCard
              latitude={location.coordinates.lat}
              longitude={location.coordinates.lng}
            />
            {routeData.fare && (
              <Fare nFare={routeData.fare} time={routeData.time} />
            )}
          </VStack>
          <RouteCard stationsList={routeData.stationsList} />
        </SimpleGrid>
      </Container>
    </div>
  );
}
