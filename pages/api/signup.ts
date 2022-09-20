import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import md5 from "md5";
import DB from "./util/database";
export default function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const methodMap = {
		POST,
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

async function DELETE(request: NextApiRequest, response: NextApiResponse) {
	const body = request.body;
	const [email, password, session] = [
		body.email,
		body.password,
		body.session,
	];
	if (
		email === undefined ||
		password === undefined ||
		session === undefined
	) {
		return response
			.status(400)
			.send("Please add email, password and session in request.");
	}
	if ((await DB.users.count({ email: { $eq: email } })) === 0) {
		return response.status(403).send("Email does not exists!");
	}
	const passwordHash = (
		await DB.users.findOne(
			{
				email,
				sessions: { $in: [session] },
			},
			{ projection: { passwordHash: 1 } }
		)
	)?.passwordHash;
	if (passwordHash !== md5(password)) {
		return response.status(403).send("Wrong password or session!");
	}
	const deleteReq = await DB.users.deleteOne({
		email,
		passwordHash: md5(password),
		sessions: { $in: [session] },
	});
	if (!deleteReq.acknowledged) {
		return response.status(500).send("something went wrong.");
	}
	return response.send(200);
}
