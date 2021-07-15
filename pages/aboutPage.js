import React from 'react';
import {Box ,Center,HStack,Text} from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import jsImg from "../public/js.svg";
import reactImg from "../public/react.svg";
import graphqlImg from "../public/graphql.svg";
import nextjsImg from "../public/nextjs.svg";
import awsImg from "../public/aws.svg";

export default function AboutPage() {
  return (
      <div>
      <Navbar />
      <Box padding="20px "position= "absolute"
        width ="1000px" height="790px"left="200px"top="150px" 
        borderWidth="1px" fontSize="17"
        borderRadius="4px" fontFamily="sans-serif"
        bgGradient="radial-gradient(99.97% 16823.96% at 0.03% 6.31%, rgba(255, 255, 255, 0.42) 2.62%, rgba(255, 255, 255, 0.06) 100%);
">
      <Text fontWeight="600" fontSize="40">About Tranzit</Text>
        Tranzit is a metro pathfinder web-app which finds you the shortest way to your destination right at your fingertips.<br/><br/>
        <Text>No need to worry about the complex delhi metro lines anymore. Just put in your Source and Destination and get there in no time. 
          Get detailed Description of the time and distance to reach and also get the location of your nearest Metro Station.</Text><br/>
        <Text>More cities support coming soon. Not affiliated with DMRC (Delhi Metro Rail Corporation).</Text><br/>
        Built by:
        <br/>Aman Kumar
        <br/>Kaustubh Debnath
        <br/>Sumit Prakash
        <br/>Ayush Neekhar
        <br/>S C Ashwin
        <br/>
        <Center><Text fontWeight="100" fontSize="28" fontFamily="sans-serif">Built Using</Text></Center>
        <br/>
        <Center>
        <HStack spacing="24px">
          <Image
            height="70px" width="70px"
            src={graphqlImg}
            alt="Graphql"
          />
          <Image height="80px" width="80px" mr={10}
          src={reactImg} 
          alt="React"/>
          <Image
            height="80px" width="80px"
            src={nextjsImg}
            alt="Nextjs"
          />
          <Image
            height="80px" width="80px"
            src={awsImg}
            alt="AWS"
          />
          <Image
            height="80px" width="80px"
            src={jsImg}
            alt="JS"
          />
        </HStack></Center>
      <br/>
      <Center><Text>Developed with ❤️ in india</Text></Center>
      </Box>
      </div>
  );
}