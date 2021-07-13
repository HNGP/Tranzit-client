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
          // bgGradient={"linear(to-b, dark.100, purple.300)"}
          bgGradient={"linear(to-bl, orange.100, purple.800)"}
        />
      </div>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
