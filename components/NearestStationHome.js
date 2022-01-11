import React from "react";
import { Box, Text } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import LocationIcon from "../public/location-pin.png";
import useFindNearestStation from "../hooks/useFindNearestStation";
import { GoLocation } from "react-icons/go";
import { Row, Col } from "antd";

const NearestStationHome = (props) => {
  let { latitude, longitude } = props;
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  const { data } = useFindNearestStation({
    variables: { latitude, longitude },
  });

  return (
    <>
      <Row style={{ marginLeft: "12px", marginTop: "10px", padding: "5px" }}>
        <Col span={4}>
          <GoLocation size={35} />
        </Col>
        <Col span={20} style={{ marginLeft: "-10px", marginTop: "5px" }}>
          <p
            style={{
              fontSize: "12px",
              lineHeight: "0.8",
              color: "#8E8787",
            }}
          >
            NEAREST STATION
          </p>
          {latitude && longitude && data ? (
            <p style={{ fontSize: "18px", lineHeight: "1.2" }}>
              {data.nearestStation.nearestStation}
            </p>
          ) : (
            <p>Loading....</p>
          )}
        </Col>
      </Row>
    </>
  );
};

export default NearestStationHome;
