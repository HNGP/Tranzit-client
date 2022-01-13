import { Box } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { Steps, Tag } from "antd";
import React, { useContext } from "react";
import { MdCircle } from "react-icons/md";
import { RiExchangeFill } from "react-icons/ri";
import { LINE_TO_COLOR } from "../constants/staticData";
import RouteContext from "../context/routeContext";
import styles from "../styles/RouteCard.module.css";

const { Step } = Steps;

const RouteCard = () => {

	const { routeData } = useContext(RouteContext);
	return (
		<Box
			className={styles.routeCard}
			// maxW='sm'
			w='22.5%'
			w={[420, 420, 500]}>
			<div className={styles.routeContainer}>
				<Steps direction='vertical' current={100}>
					{routeData.stationsList.map((station, index) => {
						if (station.lines.length > 1) {
							return (
								<Step
									title={<h1>{station.station}</h1>}
									description={
										<>
											INTERCHANGE FROM
											<Tag
												color={
													LINE_TO_COLOR[
														routeData.stationsList[index - 1].lines[0]
													]
												}
												style={{ marginLeft: "10px" }}>
												{" "}
												{routeData.stationsList[index - 1].lines[0]}{" "}
											</Tag>
											TO
											<Tag
												color={
													LINE_TO_COLOR[
														routeData.stationsList[index + 1].lines[0]
													]
												}
												style={{ marginLeft: "10px" }}>
												{" "}
												{routeData.stationsList[index + 1].lines[0]}
											</Tag>
										</>
									}
									icon={
										<RiExchangeFill
											style={{
												color: "Black",
												fontSize: "30px",
											}}
										/>
									}
								/>
							);
						} else {
							return (
								<Step
									title={<h1>{station.station}</h1>}
									description={station.lines[0]}
									icon={
										<MdCircle
											style={{
												color: LINE_TO_COLOR[station.lines[0]],
												margin: "3px",
											}}
										/>
									}
								/>
							);
						}
					})}
				</Steps>
			</div>
		</Box>
	);

};

export default RouteCard;
