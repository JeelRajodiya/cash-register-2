import type { VercelRequest, VercelResponse } from "@vercel/node";
import DB from "./util/database";
export default async (request: VercelRequest, response: VercelResponse) => {
	const r = await DB.users.find({}).toArray();

	response.send(r);
};
