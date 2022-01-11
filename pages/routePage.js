import { Container, SimpleGrid, VStack } from "@chakra-ui/react";
import gql from "graphql-tag";
import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";
import { useLazyQuery } from "react-apollo";
import { useRouter } from "next/router";
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

  return (
    <div>
      <Navbar />
      <Container className="layout" maxW="container.xl" centerContent ml={0}>
        <SimpleGrid columns={2} spacing={3} ml={50}>
          <VStack width="100%" spacing={3} ml={150}>
            <StationsSelect
              findShortestPath={findShortestPath}
              isLoading={routeData.loading}
              latitude={location.coordinates.lat}
              longitude={location.coordinates.lng}
            />
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


  