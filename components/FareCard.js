import React from "react";
import { Box, Text } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

const Fare = (props) => {
  return (
    <Box
      maxW="sm"
      //   borderWidth="1px"
      w="22.5%"
      minW="200px"
      borderRadius="lg"
      overflow="hidden"
      style={{
        backdropFilter: "blur(10rem)",
        boxShadow: "6px 6px 20px rgba(122, 122, 122, 0.212)",
      }}
      bgGradient="linear(to-br, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))"
    >
      <Box m="3">
        <Text m="3" mb="0">
          Normal Fare
        </Text>
        <Text ml="3" mb="0" fontSize="6xl" p="0" lineHeight="45px">
          ₹{props.nFare}
        </Text>
        <Text m="3" mb="0" pt="2">
          Consessional Fare
        </Text>
        <Text ml="3" mb="0" fontSize="6xl" pb="5" lineHeight="45px">
          ₹{props.cFare}
        </Text>
      </Box>
    </Box>
  );
};

export default Fare;
