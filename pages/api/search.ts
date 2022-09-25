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

async function GET(request: NextApiRequest, response: NextApiResponse) {
	const query = request.query;
	const session = query.session;
	const queryText = query.queryText as string;

	if (session === undefined || queryText === undefined) {
		return response
			.status(400)
			.send("Please add  session and queryText in request.");
	}
	const user = await DB.users.findOne({ sessions: { $in: [session] } });
	if (user === null) {
		return response
			.status(403)
			.send("Session does not exists. maybe you were logged out. ");
	}
	const userID = user.userID;
	const results = await DB.entries
		.find({
			userID,
			$or: [
				{ description: { $regex: queryText } },
				{ amount: Number(queryText) },
			],
		})
		.toArray();
	return response.json(results);
}
