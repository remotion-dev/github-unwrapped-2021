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
  res.status(200).json({
    overallProgress: progress.overallProgress,
    outputFile: progress.outputFile,
  });
}
