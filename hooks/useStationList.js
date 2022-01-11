import { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

const STATION_LIST_QUERY = gql`
  query StationsQuery {
    stations {
      id
      title
    }
  }
`;

const useStationList = () => {
  return useQuery(STATION_LIST_QUERY);
};

export default useStationList;
