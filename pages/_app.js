// import "../styles/antdesign.less";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "../styles/Lines.css";
import Image from "next/image";
import { ChakraProvider, Box } from "@chakra-ui/react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import backgroundImage from "../public/background.png";

const PROD_URL = "https://fast-journey-59048.herokuapp.com/graphql";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API,
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
            bgGradient={["radial(#D4D8DB, white)"]}
            /* Rectangle 1 */
          />
        </div>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
