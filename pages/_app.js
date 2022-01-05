// import "../styles/antdesign.less";
import "../styles/globals.css";
import "antd/dist/antd.css";
import Image from "next/image";
import { ChakraProvider, Box } from "@chakra-ui/react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import backgroundImage from "../public/background.png";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
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
