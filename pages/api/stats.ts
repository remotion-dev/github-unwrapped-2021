import { NextApiRequest, NextApiResponse } from "next";
import { getUser, Stats } from "../../src/get-user";

type RequestData = {
  username: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stats>
) {
  const body = JSON.parse(req.body) as RequestData;

  const data = await getUser(body.username, process.env.GITHUB_TOKEN as string);

  res.status(200).json(data);
}
