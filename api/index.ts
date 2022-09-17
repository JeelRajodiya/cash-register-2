import type { VercelRequest, VercelResponse } from "@vercel/node";
import DB from "../util/Database";
export default async (request: VercelRequest, response: VercelResponse) => {
	const r = await DB.users.find({}).toArray();

	response.send(r);
};
