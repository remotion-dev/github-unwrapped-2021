import { getRenderProgress, RenderProgress } from "@remotion/lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import { AWS_REGION, functionName } from "../../src/config";

type RequestData = {
  renderId: string;
  bucketName: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RenderProgress>
) {
  const body = JSON.parse(req.body) as RequestData;

  const progress = await getRenderProgress({
    renderId: body.renderId,
    bucketName: body.bucketName,
    functionName,
    region: AWS_REGION,
  });

  res.status(200).json(progress);
}
