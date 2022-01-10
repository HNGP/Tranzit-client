import Head from "next/head";
import Image from "next/image";
import React from "react";
import Fare from "../components/FareCard";
import Navbar from "../components/Navbar";
import StationsSelect from "../components/StationsSelectCard";
import { Stations } from "../components/routeSample";
import { useState, useEffect, useContext } from "react";
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
import RouteContext from "../context/routeContext";
import { useRouter } from "next/router";

const ROUTE_QUERY = gql`
  query routeQuery($source: Int, $destination: Int) {
    route(source: $source, destination: $destination) {
      time
      stationsList {
        station
        lines
      }
      fare
    }
  }
`;

export default function RoutePage() {
  const location = useGeolocation();
  const { setRouteData } = useContext(RouteContext);

  const [runDijkstra, { loading, error, data }] = useLazyQuery(ROUTE_QUERY);

  const onClose = () => {
    setModalOpen(false);
  };

  const router = useRouter();
  let source1 = router.query.src;
  let destination1 = router.query.des;

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
            <Fare />
          </VStack>
          <RouteCard />
        </SimpleGrid>
      </Container>
    </div>
  );
}
