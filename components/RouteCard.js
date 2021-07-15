import React from "react";
import { Box, Text } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

const RouteCard = (props) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      //   w="22.5%"
      minW="600px"
      borderRadius="15px"
      overflow="hidden"
      style={{
        backdropFilter: "blur(10rem)",
        boxShadow: "6px 6px 20px rgba(122, 122, 122, 0.212)",
      }}
      bgGradient="linear(to-br, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))"
    ></Box>
  );
};

export default RouteCard;
