import { AwsRegion, getRenderProgress, RenderProgress } from "@remotion/lambda";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestData = {
  renderId: string;
  bucketName: string;
  functionName: string;
  region: AwsRegion;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RenderProgress>
) {
  const body = JSON.parse(req.body) as RequestData;

  const progress = await getRenderProgress({
    renderId: body.renderId,
    bucketName: body.bucketName,
    functionName: body.functionName,
    region: body.region,
  });

  res.status(200).json(progress);
}
