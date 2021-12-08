import { renderVideoOnLambda } from "@remotion/lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import { AWS_REGION, COMP_NAME, functionName, SITE_ID } from "../../src/config";

type Data = {
  renderId: string;
  bucketName: string;
};

process.env.AWS_ACCESS_KEY_ID = process.env.REMOTION_AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = process.env.REMOTION_AWS_SECRET_ACCESS_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body);
  const { renderId, bucketName } = await renderVideoOnLambda({
    region: AWS_REGION,
    functionName: functionName,
    serveUrl: SITE_ID,
    composition: COMP_NAME,
    inputProps: body.inputProps,
    codec: "h264-mkv",
    imageFormat: "jpeg",
    maxRetries: 1,
    privacy: "public",
  });
  res.status(200).json({ renderId, bucketName });
}
