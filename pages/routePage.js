import { Container, SimpleGrid, VStack } from "@chakra-ui/react";
import gql from "graphql-tag";
import React, { useContext, useEffect } from "react";
import { useLazyQuery } from "react-apollo";
import Fare from "../components/FareCard";
import Navbar from "../components/Navbar";
import NearestStationCard from "../components/NearestStationCard";
import RouteCard from "../components/RouteCard";
import StationsSelect from "../components/StationsSelectCard";
import RouteContext from "../context/routeContext";
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

export default function RoutePage() {
  const location = useGeolocation();
  const { setRouteData } = useContext(RouteContext);

  const [runDijkstra, { loading, error, data }] = useLazyQuery(ROUTE_QUERY);

  const onClose = () => {
    setModalOpen(false);
  };

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
      <Navbar />
      <Container className="layout" maxW="container.xl" centerContent ml={0}>
        <SimpleGrid columns={2} spacing={3} ml={50}>
          <VStack width="100%" spacing={3} ml={150}>
            <StationsSelect runDijkstra={runDijkstra} />
            <NearestStationCard
              latitude={location.coordinates.lat}
              longitude={location.coordinates.lng}
            />
            <Fare />
          </VStack>
          <RouteCard />
        </SimpleGrid>
      </Container>
    </div>
  );
}
