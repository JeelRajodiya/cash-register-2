import Layout from "../components/Layout";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

dynamic(() => import("recharts").then(Line), { ssr: false });
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
	let i: string;
	for (i of Object.keys(data)) {
		graphData.push({
			x: i,
			y: data[i],
		});
	}
	console.log(graphData);
	setData(graphData);
}

export default function Search() {
	const [chartData, setChartData] = useState<any>();
	useEffect(() => {
		fetchGraphData(setChartData, "month", "2021-08");
	}, []);

	return (
		<Layout>
			<div style={{ height: "100%" }}>
				<LineChart width={600} height={300} data={chartData}>
					<Line type="monotone" dataKey="uv" stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" />
					<XAxis dataKey="name" />
					<YAxis />
				</LineChart>
			</div>
		</Layout>
	);
}
