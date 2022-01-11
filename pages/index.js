import { useState, useEffect } from "react";
import { Form, Select, InputNumber, Switch, Slider, Button } from "antd";
import { MdCircle } from "react-icons/md";
import Image from "next/image";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Logo from "../public/tranzit-2x.png";
import styles from "../styles/Home.module.css";
import { SmileFilled } from "@ant-design/icons";
import Link from "next/link";
import StationsSelect from "../components/StationsSelectCard";
import gql from "graphql-tag";
import { useLazyQuery } from "react-apollo";
import SVGComponent from "../components/MetroLines";

const ROUTE_QUERY = gql`
  query routeQuery($source: Int, $destination: Int) {
    route(source: $source, destination: $destination) {
      distance
      stationsList {
        station
        lines
      }
      fare
      time
    }
  }
`;

export default function Home() {
  const [routeData, setRouteData] = useState({
    fare: null,
    stationsList: [],
    time: null,
  });

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
            <StationsSelect runDijkstra={runDijkstra} />
          </div>
        </Box>
        <Box style={{ padding: "200px 250px" }}>
          <SVGComponent />
        </Box>
      </SimpleGrid>
    </div>
  );
}
