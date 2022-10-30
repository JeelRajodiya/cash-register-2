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
	const validMonths = "1 2 3 4 5 6 7 8 9 10 11 12";
	if (filterTypeObj === "month" && validMonths.includes(filterDate)) {
		const entries = await DB.entries
			.find({
				userID,
				$expr: { $eq: [{ $month: "$date" }, parseInt(filterDate)] },
			})
			.toArray();
		return response.status(200).send(entries);
	}
	// const entries = await DB.entries
	// 	.find({ userID: userID, date: { $expr: { $eq: [{ $month: } ]} } })
	// 	.toArray();

	// db.customer.find({ "$expr": { "$eq": [{ "$month": "$bday" }, 9] } })
	return response.status(200).send(entries);
}
