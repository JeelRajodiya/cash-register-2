import Layout from "../components/Layout";
import { useState } from "react";
import dynamic from "next/dynamic";
import { getCookie } from "cookies-next";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});
async function fetchGraphData(
	setData: (value: any) => void,
	filterType: string,
	filterDate: string
) {
	const session = getCookie("session");
	const response = await fetch(
		`/api/graph?session=${session}&&filterType=${filterType}&&filterDate=${filterDate}`
	);
	const data = await response.json();
	setData(data);
	console.log(data);
}

export default function Search() {
	const [chartData, setChartData] = useState<any>();

	const [chartProps, setChartProps] = useState({
		options: {
			// chart: {
			// 	id: "chart2",
			// 	type: "area",
			// 	height: 230,
			// 	foreColor: "#ccc",
			// 	toolbar: {
			// 		autoSelected: "pan",
			// 		show: false,
			// 	},
			// },
			// colors: ["#00BAEC"],
			// stroke: {
			// 	width: 3,
			// },
			grid: {
				borderColor: "#555",
				clipMarkers: false,
				yaxis: {
					lines: {
						show: false,
					},
				},
			},
			// dataLabels: {
			// 	enabled: false,
			// },
			fill: {
				gradient: {
					enabled: true,
					opacityFrom: 0.55,
					opacityTo: 0,
				},
			},
			markers: {
				size: 5,
				colors: ["#000524"],
				strokeColor: "#00BAEC",
				strokeWidth: 3,
			},

			tooltip: {
				theme: "dark",
			},
			// xaxis: {
			// 	type: "datetime",
			// },
			// yaxis: {
			// 	min: 0,
			// 	tickAmount: 4,
			// },
		},
		series: [
			{
				name: "Series 1",
				data: [45, 52, 38, 45, 19, 23, 2],
			},
		],
	});

	return (
		<Layout>
			<div style={{ height: "100%" }}>
				<ReactApexChart
					options={chartProps.options}
					series={chartProps.series}
					type="area"
					height={350}
					width={500}
				/>
			</div>
		</Layout>
	);
}
