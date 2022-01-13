import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import RouteContext from "../context/routeContext";
import { Col, Row } from "antd";

const Fare = (props) => {
  const { routeData } = useContext(RouteContext);
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      w="22.5%"
      minW="420px"
      borderRadius="15px"
      overflow="hidden"
      style={{
        backdropFilter: "blur(10rem)",
        boxShadow: "6px 6px 20px rgba(122, 122, 122, 0.212)",
      }}
      // bgGradient="linear(to-br, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))"
    >
      <Box m="3">
        <Row>
          <Col span={16}>
            <Text m="3" mb="0">
              Normal Fare
            </Text>

            <Text ml="3" mb="0" fontSize="6xl" p="0" lineHeight="45px">
              ₹{routeData.fare || 0}
            </Text>

            <Text m="3" mb="0" pt="2">
              Time
            </Text>
            <Text ml="3" mb="5" fontSize="6xl" p="0" lineHeight="45px">
              {parseInt(routeData.time, 10) || 0}min
            </Text>
          </Col>
          <Col span={8}>
            <Text m="1" mb="0" pt="2">
              Interchanges
            </Text>
            <Text ml="3" mb="0" fontSize="6xl" pb="5" lineHeight="45px">
              {routeData.interchange || 0}
            </Text>
          </Col>
        </Row>
      </Box>
    </Box>
  );
};

export default Fare;
