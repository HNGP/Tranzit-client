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
  if (parameters.variables.latitude && parameters.variables.longitude)
    return useQuery(NEAREST_STATION_QUERY, parameters);
  return { data: null };
};

export default useFindNearestStation;
