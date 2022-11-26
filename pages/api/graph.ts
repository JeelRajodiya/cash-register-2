import { NextApiRequest, NextApiResponse } from "next";
import DB from "./util/database";
export default function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const methodMap = {
		GET,
	};
	if (
		request.method !== undefined &&
		Object.keys(methodMap).includes(request.method)
	) {
		return methodMap[request.method as keyof typeof methodMap](
			request,
			response
		);
	} else {
		return response
			.status(400)
			.send(
				`Method not allowed (only ${Object.keys(
					methodMap
				)} are allowed).`
			);
	}
}

type FilterType = "all" | "month" | "year";

async function GET(request: NextApiRequest, response: NextApiResponse) {
	const session = request.query.session;
	if (session === undefined) {
		return response.status(400).send("Please add  session in request.");
	}
	const filterDate = request.query.filterDate as string;
	const filterType = request.query.filterType as string;
	if (filterDate === undefined || filterType === undefined) {
		return response
			.status(400)
			.send("Please add  filterDate and filterType in request.");
	}

	const filterTypeObj = filterType as FilterType;

	if (filterTypeObj === "month" && filterDate.split("-").length !== 2) {
		return response
			.status(400)
			.send("Please add filterDate in format MM-YYYY.");
	}
	// if the filterType is not in all , year, month
	if (!["all", "month", "year"].includes(filterTypeObj)) {
		return response.status(400).send("Please add  filterType in request.");
	}

	const user = await DB.users.findOne({ sessions: { $in: [session] } });

	if (user === null) {
		return response
			.status(403)
			.send("Session does not exists. maybe you were logged out. ");
	}
	const userID = user.userID;
	const validMonths = "1 2 3 4 5 6 7 08 9 10 11 12";
	if (
		filterTypeObj === "month" &&
		validMonths.includes(filterDate.split("-")[0])
	) {
		let conciseData: { [date: number]: number } = {};
		let tempConciseData: { [date: number]: number[] } = {};

		const entries = await DB.entries
			.find(
				{
					userID,
					$expr: {
						$and: [
							{
								$eq: [
									{ $month: "$date" },
									parseInt(filterDate.split("-")[0]),
								],
							},
							{
								$eq: [
									{ $year: "$date" },
									parseInt(filterDate.split("-")[1]),
								],
							},
						],
					},
				},
				{ projection: { amount: 1, date: 1, _id: 0 } }
			)
			.toArray();
		for (const entry of entries) {
			const date = entry.date.getDate();
			if (tempConciseData[date] === undefined) {
				tempConciseData[date] = [];
			}
			tempConciseData[date].push(entry.amount);
		}
		for (const date in tempConciseData) {
			conciseData[date] = tempConciseData[date].reduce(
				(a, b) => a + b,
				0
			);
		}
		return response.status(200).send(conciseData);
	} else if (filterTypeObj === "year") {
		let conciseData: { [year: number]: number } = {};
		let tempConciseData: { [year: number]: number[] } = {};

		const entries = await DB.entries
			.find(
				{
					userID,
					$expr: {
						$eq: [{ $year: "$date" }, parseInt(filterDate)],
					},
				},
				{ projection: { amount: 1, date: 1, _id: 0 } }
			)
			.toArray();
		for (const entry of entries) {
			const month = entry.date.getMonth() + 1;

			if (tempConciseData[month] === undefined) {
				tempConciseData[month] = [];
			}
			tempConciseData[month].push(entry.amount);
		}
		for (const month in tempConciseData) {
			conciseData[month] = tempConciseData[month].reduce(
				(a, b) => a + b,
				0
			);
		}
		console.log(conciseData);
		return response.status(200).send(conciseData);
	} else {
		const entries = await DB.entries
			.find({ userID }, { projection: { amount: 1, date: 1, _id: 0 } })
			.toArray();
		return response.status(200).send(entries);
	}
}
