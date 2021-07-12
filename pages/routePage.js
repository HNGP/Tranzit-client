import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
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
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { sortedLastIndex, truncate } from "lodash";
import Navbar from "../components/Navbar";

export default function RoutePage() {
  const [modalOpen, setModalOpen] = useState(false);
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

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>bruh</h1>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Slide
        direction="top"
        in={slideOpen}
        style={{ zIndex: 10, marginLeft: "150px" }}
      >
        <Navbar></Navbar>

        {stations.map((element, index) => {
          return (
            <Box
              p="10px"
              color={element.details.line}
              mt="4"
              fontSize="40px"
              width="80%"
              bg="white.500"
              rounded="md"
              shadow="md"
              key={index}
            >
              <p> {element.title}</p>
              {element.details.line.length > 1 ? (
                <div style={{ fontSize: "20px" }}>
                  <span>Interchange</span>
                  <Badge colorScheme={element.details.line[0]}>
                    {element.details.line[0]}
                  </Badge>
                  <ArrowForwardIcon />
                  <Badge colorScheme={element.details.line[1]}>
                    {element.details.line[1]}
                  </Badge>
                </div>
              ) : (
                <></>
              )}
            </Box>
          );
        })}
      </Slide>
    </div>
  );
}
