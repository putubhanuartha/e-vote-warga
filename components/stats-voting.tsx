import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import generateRGBAValues from "@/helper/_FUNCTION";
import { Box } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

export type StatsPemilihan = {
	datas: { label: string; value: number }[];
	titleLabel: string;
};
const StatsPemilihan: React.FC<StatsPemilihan> = ({ titleLabel, datas }) => {
	function generateDataStats(datas: { label: string; value: number }[]) {
		const data = {
			labels: datas.map((el) => el.label),
			datasets: [
				{
					label: titleLabel,
					data: datas.map((el) => el.value),
					backgroundColor: generateRGBAValues(datas.length),
					borderWidth: 1,
				},
			],
		};
		return data;
	}

	return (
		<Box
			w={"full"}
			h={{ base: "30rem", md: "40rem", lg: "50rem" }}
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			flexDirection={"column"}
		>
			<Pie data={generateDataStats(datas)} />
		</Box>
	);
};

export default StatsPemilihan;
