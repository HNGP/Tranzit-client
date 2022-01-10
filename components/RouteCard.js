import React, { useContext } from "react";
import { Steps, Button } from "antd";
import { MdCircle } from "react-icons/md";
import { Box, Text, Heading } from "@chakra-ui/react";
import { STATION_LIST, LINE_TO_COLOR } from "../constants/staticData";
import styles from "../styles/RouteCard.module.css";
import RouteContext from "../context/routeContext";

const { Step } = Steps;

const RouteCard = ({ stationsList }) => {
  const { routeData } = useContext(RouteContext);
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
    >
      <div className={styles.routeContainer}>
        <Steps direction="vertical" current={100}>
          {routeData.stationsList.map((station) => (
            <Step
              title={station.station}
              description={station.lines[0]}
              icon={
                <MdCircle
                  style={{
                    color: LINE_TO_COLOR[station.lines[0]],
                    margin: "3px",
                  }}
                />
              }
            />
          ))}
        </Steps>
      </div>
    </Box>
  );
};

export default RouteCard;
