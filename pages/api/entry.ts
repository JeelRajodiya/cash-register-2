import { NextApiRequest, NextApiResponse } from "next";

import DB from "../util/database";
import type { User } from "../util/types";
import { v4 as uuidV4 } from "uuid";
export default function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const methodMap = {
		POST,
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

async function POST(request: NextApiRequest, response: NextApiResponse) {
	const body = request.body;
	const session = body.session;
	const amountStr = body.amount;
	const description = body.description ? body.description : "-";
	const date = body.date ? new Date(body.date) : new Date();

	if (session === undefined || amountStr === undefined) {
		return response
			.status(400)
			.send("Please add  session and amount in request.");
	}
	const user = await DB.users.findOne({ sessions: { $in: [session] } });
	if (user === null) {
		return response
			.status(403)
			.send("Session does not exists. maybe you were logged out. ");
	}
	const userID = user.userID;
	const entryID = uuidV4();
	const amount = Number(amountStr);
	if (amount > 10000000 || amount < -10000000) {
		return response
			.status(403)
			.send("Amount should be in range [-10000000,10000000].");
	}
	const insertEvent = await DB.entries.insertOne({
		userID,
		entryID,
		date,
		amount,
		description,
	});
	if (insertEvent.acknowledged === false) {
		return response.status(500).send("Something went wrong");
	}

	return response.send(entryID);
}

async function GET(request: NextApiRequest, response: NextApiResponse) {
	const body = request.body;
	const session = body.session;
	const maxResults = body.maxResults;
	if (session === undefined) {
		return response.status(400).send("Please add  session  in request.");
	}
	const user = await DB.users.findOne({ sessions: { $in: [session] } });
	if (user === null) {
		return response
			.status(403)
			.send("Session does not exists. maybe you were logged out. ");
	}
}
