import type { VercelRequest, VercelResponse } from "@vercel/node";
import { v4 } from "uuid";
import md5 from "md5";
import DB from "../util/database";
export default function handler(
	request: VercelRequest,
	response: VercelResponse
) {
	const methodMap = {
		POST,
		GET,
	};
	if (request.method !== undefined) {
		methodMap[request.method](request, response);
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
	if ((await DB.users.count({ email: { $eq: email } })) !== 0) {
		return response.status(403).send("Email already exists!");
	}
	const newSession = v4();
	const insertEvent = await DB.users.insertOne({
		userID: v4(),
		email,
		passwordHash: md5(password),
		sessions: [newSession],
	});

	if (!insertEvent.acknowledged) {
		response
			.status(500)
			.send("Could not create user. Something went wrong.");
	}

	return response.json({ session: newSession });
}

function GET(request: VercelRequest, response: VercelResponse) {
	return response.send("GET");
}
