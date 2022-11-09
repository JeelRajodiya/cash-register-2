import { NextApiRequest, NextApiResponse } from "next";

import DB from "./util/database";
import { v4 as uuidV4 } from "uuid";
export default function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const methodMap = {
		POST,
		GET,
		DELETE,
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
	const description = body.description ? (body.description as string) : "-";
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
	const maxCharacters = 100;
	if (description.length > maxCharacters) {
		return response
			.status(400)
			.send(` only ${maxCharacters} characters are allowed.`);
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
	const query = request.query;
	const session = query.session;

	const maxResults = query.maxResults ? Number(query.maxResults) : 0;
	if (session === undefined) {
		return response.status(400).send("Please add  session  in request.");
	}
	const user = await DB.users.findOne({ sessions: { $in: [session] } });
	if (user === null) {
		return response
			.status(403)
			.send("Session does not exists. maybe you were logged out. ");
	}
	const userID = user.userID;

	const results = await DB.entries
		.find({ userID })
		.sort({ date: -1 })
		.limit(maxResults)
		.toArray();
	return response.json(results);
}

async function DELETE(request: NextApiRequest, response: NextApiResponse) {
	// const body = request.body;
	const session = request.query.session;
	const entryID = request.query.entryID;

	if (session === undefined || entryID === undefined) {
		return response
			.status(400)
			.send("Please add  session and entryID  in request.");
	}
	const user = await DB.users.findOne({ sessions: { $in: [session] } });
	if (user === null) {
		return response
			.status(403)
			.send("Session does not exists. maybe you were logged out. ");
	}
	const userID = user.userID;

	const deleteEvent = await DB.entries.deleteOne({ userID, entryID });
	if (deleteEvent.deletedCount === 0) {
		return response.status(403).send("You entered wrong entryID.");
	} else if (!deleteEvent.acknowledged) {
		return response.status(500).send("something went Wrong!");
	}
	return response.send(200);
}
