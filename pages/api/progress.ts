import { getRenderProgress } from "@remotion/lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import { functionName, AWS_REGION } from "../../src/config";

type Data = {
  overallProgress: number;
  outputFile: string | null;
};

type RequestData = {
  renderId: string;
  bucketName: string;
};

process.env.REMOTION_AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
process.env.REMOTION_AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body) as RequestData;

  const progress = await getRenderProgress({
    renderId: body.renderId,
    bucketName: body.bucketName,
    functionName,
    region: AWS_REGION,
  });
  console.log(progress);
  res.status(200).json({
    overallProgress: progress.overallProgress,
    outputFile: progress.outputFile,
  });
}
