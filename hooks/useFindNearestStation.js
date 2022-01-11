import { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

const NEAREST_STATION_QUERY = gql`
  query nearestStationQuery($latitude: Float, $longitude: Float) {
    nearestStation(latitude: $latitude, longitude: $longitude) {
      nearestStation
    }
  }
`;

const useFindNearestStation = (parameters) => {
  return useQuery(NEAREST_STATION_QUERY, parameters);
};

export default useFindNearestStation;
