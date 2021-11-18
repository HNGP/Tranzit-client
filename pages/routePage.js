import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Fare from "../components/FareCard";
import Navbar from "../components/Navbar";
import StationsSelect from "../components/StationsSelectCard";
import { Stations } from "../components/routeSample";
import { useState, useEffect } from "react";
import axios from "axios";
import useGeolocation from "../hooks/useGeoLocation";
import gql from "graphql-tag";
import { Query } from "react-apollo";
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
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { sortedLastIndex, truncate } from "lodash";
import backgroundImage from "../public/background.png";
import RouteCard from "../components/RouteCard";
import NearestStationCard from "../components/NearestStationCard";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
});

export default function RoutePage() {
  const location = useGeolocation();
  const [slideOpen, setSlideOpen] = useState(true);
  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");

  const getSrc = (src) => {
    setSrc(src);
    console.log(src);
  };
  const getDest = (dest) => {
    setDest(dest);
    console.log(dest);
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <ApolloProvider client={client}>
        <Container className="layout" maxW="container.xl" centerContent ml={0}>
          <SimpleGrid columns={2} spacing={1}>
            <VStack width="100%" spacing={5}>
              <StationsSelect sendStateSrc={getSrc} sendStateDest={getDest} />
              <NearestStationCard
                latitude={location.coordinates.lat}
                longitude={location.coordinates.lng}
              />
              <Fare nFare={"50"} cFare={"40"} />
            </VStack>
            <RouteCard />
          </SimpleGrid>
        </Container>
      </ApolloProvider>
    </div>
  );
}
