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

export default function Graph() {
	// const [chartData, setChartData] = useState<any>();
	const nowTime = new Date();
	const [activeChart, setActiveChart] = useState({
		type: "month",
		date: `${nowTime.getMonth() + 1}-${nowTime.getFullYear()}`,
	});
	useEffect(() => {
		fetchGraphData(setChartProps, activeChart.type, activeChart.date);
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
				size: 0,
				colors: ["#000524"],
				strokeColor: "#00BAEC",
				strokeWidth: 0,
			},

			tooltip: {
				theme: "dark",
			},
			grid: {
				show: false,
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
			<select style={{ minWidth: "minContent" }}>
				<option value="this month">This Month</option>
				<option value="this year">This Year</option>
			</select>
		</Layout>
	);
}
