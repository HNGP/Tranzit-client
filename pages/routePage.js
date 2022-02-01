import gql from "graphql-tag";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { useLazyQuery } from "react-apollo";
import Fare from "../components/FareCard";
import Navbar from "../components/Navbar";
import RouteCard from "../components/RouteCard";
import StationsSelect from "../components/StationsSelectCard";
import RouteContext from "../context/routeContext";
import useGeolocation from "../hooks/useGeoLocation";
import { Row, Col } from "antd";
import styles from "../styles/routePage.module.css";
import mixpanel from "mixpanel-browser";

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

export default function RoutePage() {
  const location = useGeolocation();
  const { routeData, setRouteData } = useContext(RouteContext);
  const [station, setStation] = useState({
    source: null,
    destination: null,
  });

  const Router = useRouter();

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

  const onClose = () => {
    setModalOpen(false);
  };

  const findShortestPath = (source, destination) => {
    runDijkstra({ variables: { source, destination } });
    setStation({
      source,
      destination,
    });
  };
  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL, {
      debug: true,
      ignore_dnt: true,
    });
    mixpanel.track("Route Page Loaded");
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.HeroLayout}>
        <Row>
          <Col style={{ marginRight: "20px" }}>
            <Row>
              <StationsSelect
                findShortestPath={findShortestPath}
                isLoading={routeData.loading}
                latitude={location.coordinates.lat}
                longitude={location.coordinates.lng}
              />
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Fare />
            </Row>
          </Col>
          <Col>
            <RouteCard />
          </Col>
        </Row>
      </div>
    </div>
  );
}
