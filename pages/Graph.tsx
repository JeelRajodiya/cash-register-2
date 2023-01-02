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
	const data: { [month: number]: number } = await response.json();
	let graphData: any[] = [];
	for (let i of Object.keys(data)) {
		console.log(i);
		graphData.push({
			x: i,
			y: data[Number(i)],
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
	const nowTime = new Date();

	const [activeChart, setActiveChart] = useState({
		type: "month",
		date: `${nowTime.getMonth() + 1}-${nowTime.getFullYear()}`,
	});
	useEffect(() => {
		fetchGraphData(setChartProps, activeChart.type, activeChart.date);
	}, [activeChart.type, activeChart.date]);
	const [chartProps, setChartProps] = useState({
		options: {
			colors: ["#050a30"],
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
			<select
				style={{ minWidth: "minContent" }}
				onChange={(e) => {
					let filterDate = "";
					let filterType = "";
					if (e.target.value === "this month") {
						filterType = "month";
						filterDate = `${
							nowTime.getMonth() + 1
						}-${nowTime.getFullYear()}`;
					} else if (e.target.value === "this year") {
						filterDate = `${nowTime.getFullYear()}`;
						filterType = "year";
					} else if (e.target.value === "last month") {
						filterDate = `${
							nowTime.getMonth() === 0 ? 12 : nowTime.getMonth()
						}-${nowTime.getFullYear()}`;
						filterType = "month";
					} else if (e.target.value === "last year") {
						filterDate = `${nowTime.getFullYear() - 1}`;
						filterType = "year";
					} else if (e.target.value === "all") {
						filterType = "all";
					}
					console.log(filterDate, filterType);
					setActiveChart({
						type: filterType,
						date: filterDate,
					});
					// console.log(activeChart, e.target.value);
					// fetchGraphData(setChartProps, filterType, filterDate);
				}}
			>
				<option value="this month">This Month</option>
				<option value="this year">This Year</option>
				<option value="last month">Last Month</option>
				<option value="last year">Last Year</option>
				<option value="all">All Time</option>
			</select>
		</Layout>
	);
}
