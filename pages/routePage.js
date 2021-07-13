import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import Fare from "../components/FareCard";
import Navbar from "../components/Navbar";
import StationsSelect from "../components/StationsSelect";
import { Stations } from "../components/routeSample";
import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { sortedLastIndex, truncate } from "lodash";
import Navbar from "../components/Navbar";
import backgroundImage from "../public/background.png";


export default function RoutePage() {
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

      <Slide
        direction="bottom"
        in={slideOpen}
        style={{ zIndex: 10, marginLeft: "100px", marginBottom: "100px" }}
      >
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={4}
        >
          <GridItem colSpan={1} align="stretch">
            <VStack spacing={3}>
              <StationsSelect
                stationsList={Stations}
                sendStateSrc={getSrc}
                sendStateDest={getDest}
              />
              <Fare nFare={"50"} cFare={"40"} />
              <Fare nFare={"50"} cFare={"40"} />
              <Fare nFare={"50"} cFare={"40"} />
            </VStack>
          </GridItem>
          <GridItem colSpan={3}>
            <Box w="100%">
              {src} {dest}
            </Box>
          </GridItem>
        </Grid>
      </Slide>
    </div>
  );
}
