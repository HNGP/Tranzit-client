// import "../styles/antdesign.less";
import "../styles/globals.css";
import "antd/dist/antd.css";
import Image from "next/image";
import { ChakraProvider, Box } from "@chakra-ui/react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import backgroundImage from "../public/background.png";

const LOCAL_URL = "http://localhost:8000/graphql";
const PROD_URL = "https://fast-journey-59048.herokuapp.com/graphql";

const client = new ApolloClient({
  uri: PROD_URL,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <div className="bgWrap">
          <Box
            w="2400px"
            h="3000px"
            // bgGradient={"linear(to-bl, red.400, yellow.200)"}
            bgGradient={["radial( orange.200, purple.300)"]}
            /* Rectangle 1 */
          />
        </div>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
