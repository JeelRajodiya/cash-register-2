import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler (request: NextApiRequest, response: NextApiResponse) {
	return response.send(200);
};
