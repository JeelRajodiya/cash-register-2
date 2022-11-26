import Layout from "../components/Layout";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
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
	const data: any[] = await response.json();
	let graphData: any[] = [];
	// console.log(data);
	for (let i of Object.keys(data)) {
		graphData.push({
			x: i,
			y: data[i],
		});
	}

	setData((x: any) => {
		const newData = {
			...x,
			series: [
				{
					name: "Series 1",
					data: graphData,
				},
			],
		};
		// console.log(newData.series.data.length);
		return newData;
	});
	// console.log(data);
}

export default function Search() {
	const [chartData, setChartData] = useState<any>();
	useEffect(() => {
		fetchGraphData(setChartProps, "month", "2021-08");
	}, []);
	const [chartProps, setChartProps] = useState({
		options: {
			colors: ["#00BAEC"],
			stroke: {
				width: 1,
			},
			dataLabels: {
				enabled: false,
			},
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
