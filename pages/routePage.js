import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import Fare from "../components/FareCard";
import Navbar from "../components/Navbar";
import StationsSelect from "../components/StationsSelectCard";
import { Stations } from "../components/routeSample";
import { useState, useEffect } from "react";
import axios from "axios";
import useGeolocation from "../hooks/useGeoLocation";
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

export default function RoutePage() {
  const location = useGeolocation();
  const [slideOpen, setSlideOpen] = useState(true);
  const [stations, setStations] = useState([
    {
      id: 1,
      title: "Adarsh Nagar",
      connected: [2],
      details: {
        line: ["yellow"],
        layout: "Elevated",
        longitude: 77.169385,
        latitude: 28.718104,
      },
    },
    {
      id: 2,
      title: "AIIMS",
      connected: [1],
      details: {
        line: ["yellow"],
        layout: "Underground",
        longitude: 77.20771,
        latitude: 28.56892,
      },
    },
    {
      id: 3,
      title: "Rajiv Chowk",
      connected: [1],
      details: {
        line: ["yellow", "blue"],
        layout: "Underground",
        longitude: 77.21826,
        latitude: 28.63282,
      },
    },
  ]);

  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");

  const [nearestStation, setNearestStation] = useState("Noida City Centre");

  const getNearestStation = () => {
    if (location.coordinates.lat && location.coordinates.lng) {
      axios
        .get(
          `http://localhost:5000/geo?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}`
        )
        .then(
          (response) => {
            setNearestStation(response.data.nearestStation);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

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

  useEffect(() => {
    getNearestStation();
  });

  return (
    <div>
      <Navbar />
      <Container className="layout" maxW="container.xl" centerContent ml={0}>
        <SimpleGrid columns={2} spacing={1}>
          <VStack width="100%" spacing={5}>
            <StationsSelect
              stationsList={Stations}
              sendStateSrc={getSrc}
              sendStateDest={getDest}
            />
            <NearestStationCard nearestStation={nearestStation} />
            <Fare nFare={"50"} cFare={"40"} />
          </VStack>
          <RouteCard></RouteCard>
        </SimpleGrid>
      </Container>
    </div>
  );
}
