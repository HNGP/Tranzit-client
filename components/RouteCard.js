import React from "react";
import { MdCircle } from "react-icons/md";
import { Box, Text } from "@chakra-ui/react";
import { STATION_LIST, LINE_TO_COLOR } from "../constants/staticData";
import styles from "../styles/RouteCard.module.css";

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
    >
      <div className={styles.routeContainer}>
        {STATION_LIST.map((st) => (
          <div key={st.station} className={styles.stationContainer}>
            <div
              className={styles.icon}
              style={{ color: LINE_TO_COLOR[st.lines[0]] }}
            >
              <MdCircle size={20} />
            </div>
            <Text m="3" mb="0" fontSize="20px">
              {st.station}
            </Text>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default RouteCard;
