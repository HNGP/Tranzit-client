import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import gql from "graphql-tag";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { useLazyQuery } from "react-apollo";
import SVGComponent from "../components/MetroLines";
import StationsSelect from "../components/StationsSelectCard";
import RouteContext from "../context/routeContext";
import Logo from "../public/tranzit-2x.png";
import styles from "../styles/Home.module.css";
import useGeolocation from "../hooks/useGeoLocation";
import { Row, Col } from "antd";

const ROUTE_QUERY = gql`
  query routeQuery($source: Int, $destination: Int) {
    route(source: $source, destination: $destination) {
      time
      stationsList {
        station
        lines
      }
      fare
      interchange
    }
  }
`;

export default function Home() {
  const location = useGeolocation();
  const { routeData, setRouteData } = useContext(RouteContext);
  const [station, setStation] = useState({
    source: null,
    destination: null,
  });

  const router = useRouter();

  const [runDijkstra, { loading, error, data }] = useLazyQuery(ROUTE_QUERY, {
    onCompleted: (data) => {
      const { fare, stationsList, time, interchange } = data.route;
      setRouteData((prevState) => ({
        ...prevState,
        fare,
        stationsList,
        time,
        interchange,
        loading: !prevState.loading,
      }));
      Router.push({
        pathname: "/routePage",
        query: { src: station.source, des: station.destination },
      });
    },
  });

  const findShortestPath = (source, destination) => {
    runDijkstra({ variables: { source, destination } });
    setStation({
      source,
      destination,
    });
  };

  return (
    // <div className={styles.land}>
    <Row>
      {/* <Col span={14}> */}
      <Col xs={24} sm={24} md={16} lg={14} xl={14}>
        <Box
          className={styles.show}
          style={{ margin: "100px auto", maxWidth: "420px" }}
        >
          {/* <div className={styles.logoLine}> */}
          <Row style={{ margin: "auto", maxWidth: "300px" }}>
            <Col span={5} className={styles.imgCol}>
              {/* <Col
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              style={{ marginTop: "30px" }}
            > */}
              <div>
                <Image
                  src={Logo}
                  height={68}
                  width={63}
                  layout="fixed"
                  srcSet="1x"
                  style={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                />
              </div>
            </Col>
            {/* <div className={styles.logoLine}> */}
            <Col span={19}>
              {/* <Col xs={19} sm={19} md={19} lg={19} xl={19}> */}
              <Text
                // fontSize={100}
                fontSize={{ base: "85px", md: "100px", lg: "100px" }}
                px={2}
                fontWeight={300}
                bgGradient="linear(to-r, #4c4ab8, #dba171)"
                bgClip="text"
                letterSpacing="-7px"
              >
                tranzit
              </Text>
              {/* <h1 className={styles.logoText}>tranzit</h1> */}
            </Col>
          </Row>
          <Row>
            <div style={{ margin: "auto" }}>
              <StationsSelect
                findShortestPath={findShortestPath}
                isLoading={routeData.loading}
                latitude={location.coordinates.lat}
                longitude={location.coordinates.lng}
                // latitude={25.616763}
                // longitude={77.109558}
              />
            </div>
          </Row>
        </Box>
      </Col>
      <Col xs={0} sm={0} md={8} lg={10} xl={10}>
        <Box
          className={styles.hide}
          style={{ margin: "100px auto", maxWidth: "500px", position: "fixed" }}
        >
          <SVGComponent />
        </Box>
      </Col>
    </Row>
    // </div>
  );
}
