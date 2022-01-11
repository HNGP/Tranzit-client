import { Box, SimpleGrid } from "@chakra-ui/react";
import gql from "graphql-tag";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { useLazyQuery } from "react-apollo";
import SVGComponent from "../components/MetroLines";
import StationsSelect from "../components/StationsSelectCard";
import RouteContext from "../context/routeContext";
import Logo from "../public/tranzit-2x.png";
import styles from "../styles/Home.module.css";

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
  const { setRouteData } = useContext(RouteContext);

  const [runDijkstra, { loading, error, data }] = useLazyQuery(ROUTE_QUERY);

  useEffect(() => {
    if (data) {
      const { fare, stationsList, time } = data.route;
      setRouteData({
        fare,
        stationsList,
        time,
      });
    }
  }, [data]);

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
          <div style={{ marginTop: "140px", marginLeft: "80px" }}>
            <StationsSelect runDijkstra={runDijkstra} sender={"homepage"} />
          </div>
        </Box>
        <Box style={{ padding: "240px 300px" }}>
          <SVGComponent />
        </Box>
      </SimpleGrid>
    </div>
  );
}
