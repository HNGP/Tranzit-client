import "../styles/globals.css";
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
            bgGradient={"radial(gray.900, white)"}
            /* Rectangle 1 */
          />
        </div>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
