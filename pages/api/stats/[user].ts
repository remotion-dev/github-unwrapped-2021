import { NextApiRequest, NextApiResponse } from "next";
import { getContrast } from "polished";
import { getContributions } from "../../../src/get-contributions";
import { getLanguages } from "../../../src/get-languages";
import { getUser } from "../../../src/get-user";
import { ResponseType } from "../../../src/response-types";

type RequestData = {
  username: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const user = req.query.user;
  if (typeof user !== "string") {
    throw new TypeError("user must be a string");
  }
  console.log("yo");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "max-age=86400, public");

  const [stats, languages, contributions] = await Promise.all([
    getUser(user, process.env.GITHUB_TOKEN as string),
    getLanguages(user, process.env.GITHUB_TOKEN),
    getContributions(user, process.env.GITHUB_TOKEN),
  ]);

  res.status(200).json({
    stats,
    contributions,
    languages,
  });
}
