import "../styles/globals.css";
import Image from "next/image";
import { ChakraProvider, Box } from "@chakra-ui/react";
import backgroundImage from "../public/background.png";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <div className="bgWrap">
        <Box
          w="100%"
          h="100%"
          // bgGradient={"linear(to-bl, red.400, yellow.200)"}
          bgGradient={"radial(gray.500, white)"}
          /* Rectangle 1 */
        />
      </div>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
