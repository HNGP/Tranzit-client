import React from "react";
import { Steps, Button, Tag, Space } from "antd";
import { MdCircle } from "react-icons/md";
import { RiExchangeFill } from "react-icons/ri";
import { Box, Text, Heading } from "@chakra-ui/react";
import { STATION_LIST, LINE_TO_COLOR } from "../constants/staticData";
import styles from "../styles/RouteCard.module.css";
import { Stations } from "./routeSample";

const { Step } = Steps;

const RouteCard = ({ stationsList }) => {
  //   const DisplayStations = () => {
  //     stationsList.map((station) =>

  //     {return }

  // )
  //   }

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
          {stationsList.map((station, index) => {
            if (station.lines.length > 1) {
              return (
                <Step
                  title={<h1>{station.station}</h1>}
                  description={
                    <>
                      INTERCHANGE FROM
                      <Tag
                        color={LINE_TO_COLOR[stationsList[index - 1].lines[0]]}
                        style={{ marginLeft: "10px" }}
                      >
                        {" "}
                        {stationsList[index - 1].lines[0]}{" "}
                      </Tag>
                      TO
                      <Tag
                        color={LINE_TO_COLOR[stationsList[index + 1].lines[0]]}
                        style={{ marginLeft: "10px" }}
                      >
                        {" "}
                        {stationsList[index + 1].lines[0]}
                      </Tag>
                    </>
                  }
                  icon={
                    <RiExchangeFill
                      style={{
                        color: "Black",
                        fontSize: "30px",
                      }}
                    />
                  }
                />
              );
            } else {
              return (
                <Step
                  title={<h1>{station.station}</h1>}
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
              );
            }
          })}
        </Steps>
      </div>
    </Box>
  );
};

export default RouteCard;
