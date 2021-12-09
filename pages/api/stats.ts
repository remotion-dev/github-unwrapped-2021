import { NextApiRequest, NextApiResponse } from "next";
import { getLanguages } from "../../src/get-languages";
import { getUser } from "../../src/get-user";
import { ResponseType } from "../../src/response-types";

type RequestData = {
  username: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const body = JSON.parse(req.body) as RequestData;

  const [stats, languages] = await Promise.all([
    getUser(body.username, process.env.GITHUB_TOKEN as string),
    getLanguages(body.username, process.env.GITHUB_TOKEN),
  ]);

  res.status(200).json({
    stats,
    languages,
  });
}
