import { Box, SimpleGrid } from "@chakra-ui/react";
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
const ROUTE_QUERY = gql`
  query routeQuery($source: Int, $destination: Int) {
    route(source: $source, destination: $destination) {
      time
      stationsList {
        station
        lines
      }
      fare
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
      const { fare, stationsList, time } = data.route;
      setRouteData((prevState) => ({
        ...prevState,
        fare,
        stationsList,
        time,
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
    <div>
      <SimpleGrid columns={2} spacing={4}>
        {/* <div style={{ padding: "200px 250px" }}> */}
        <Box style={{ padding: "200px 250px" }}>
          <div className={styles.logoLine}>
            <Image src={Logo} height="130px" width="120px" />
          </div>
          <div className={styles.logoLine}>
            <h1 className={styles.logoText}>tranzit</h1>
          </div>
          <div style={{ marginTop: "180px", marginLeft: "10px" }}>
            <StationsSelect
              findShortestPath={findShortestPath}
              isLoading={routeData.loading}
              latitude={location.coordinates.lat}
              longitude={location.coordinates.lng}
            />
          </div>
        </Box>
        <Box style={{ padding: "240px 300px" }}>
          <SVGComponent />
        </Box>
      </SimpleGrid>
    </div>
  );
}
