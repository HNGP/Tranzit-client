import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Fare = ({ nFare, cFare }) => {
	return (
		<Box
			maxW="sm"
			borderWidth="1px"
			w="22.5%"
			minW="200px"
			borderRadius="lg"
			overflow="hidden"
			bgGradient="linear(to-r, #FFFFFF, #DFDFE0)"
		>
			<Box m="3">
				<Text m="3" mb="0">
					Normal Fare
				</Text>
				<Text ml="3" mb="0" fontSize="6xl" p="0" lineHeight="45px">
					₹40
				</Text>
				<Text m="3" mb="0" pt="2">
					Consessional Fare
				</Text>
				<Text ml="3" mb="0" fontSize="6xl" pb="5" lineHeight="45px">
					₹50
				</Text>
			</Box>
		</Box>
	);
};

export default Fare;