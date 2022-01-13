// import "../styles/antdesign.less";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "../styles/Lines.css";
import { useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import RouteContext from "../context/routeContext";
import Head from "next/head";

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_API,
});

function MyApp({ Component, pageProps }) {
	const [routeData, setRouteData] = useState({
		fare: null,
		stationsList: [],
		time: null,
		interchange: null,
		loading: false,
	});

	return (
		<ApolloProvider client={client}>
			<RouteContext.Provider value={{ routeData, setRouteData }}>
				<ChakraProvider>
					<div className='bgWrap'>
						<title> Tranzit </title>{" "}
						<Box
							w='2400px'
							h='3000px'
							bg='#F2F2F2'
							// bgGradient={"linear(to-bl, red.400, yellow.200)"}
							// bgGradient={["radial(#D4D8DB, white)"]}
							/* Rectangle 1 */
						/>
					</div>{" "}
					<Component {...pageProps} />{" "}
				</ChakraProvider>{" "}
			</RouteContext.Provider>{" "}
		</ApolloProvider>
	);
}

export default MyApp;
