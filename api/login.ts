import type { VercelRequest, VercelResponse } from "@vercel/node";
import { v4 } from "uuid";
import md5 from "md5";
import DB from "./util/database";
export default function handler(
	request: VercelRequest,
	response: VercelResponse
) {
	const methodMap = {
		POST,
		DELETE,
	};
	if (request.method !== undefined) {
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

async function POST(request: VercelRequest, response: VercelResponse) {
	const body = request.body;
	const [email, password] = [body.email, body.password];
	if (email === undefined || password === undefined) {
		return response
			.status(400)
			.send("Please add email and password in request.");
	}
	if ((await DB.users.count({ email: { $eq: email } })) === 0) {
		return response
			.status(403)
			.send("Email does not exists. Please sign up first.");
	}
	const user = await DB.users.findOne({ email });
	if (user?.passwordHash !== md5(password)) {
		return response.status(403).send("Invalid password!");
	}
	const newSession = v4();
	const updateEvent = await (
		await DB.users.updateOne(
			{ email, passwordHash: md5(password) },
			{ $push: { sessions: newSession } }
		)
	).acknowledged;
	if (!updateEvent) {
		return response.status(500).send("something went wrong.");
	}

	return response.json({ session: newSession });
}

async function DELETE(request: VercelRequest, response: VercelResponse) {
	const body = request.body;
	const session = body.session;

	if (session === undefined) {
		return response.status(400).send("Please add  session in request.");
	}
	if ((await DB.users.count({ sessions: { $eq: session } })) === 0) {
		return response
			.status(403)
			.send("Session does not exists. maybe you were logged out. ");
	}
	const updateEvent = await DB.users.updateOne(
		{
			sessions: { $in: [session] },
		},
		{ $pull: { sessions: session } }
	);
	if (!updateEvent.acknowledged) {
		return response.status(500).send("something went wrong.");
	}

	return response.send(200);
}
