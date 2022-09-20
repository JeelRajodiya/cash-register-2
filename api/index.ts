import type { NextApiRequest, NextApiResponse } from "next";
export default async (request: NextApiRequest, response: NextApiResponse) => {
	response.send(200);
};
