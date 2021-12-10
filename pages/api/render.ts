import { renderVideoOnLambda } from "@remotion/lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserLocal } from "../../remotion/get-user-data";
import { mapResponseToStats } from "../../remotion/map-response-to-stats";
import { AWS_REGION, COMP_NAME, functionName, SITE_ID } from "../../src/config";

type Data = {
  renderId: string;
  bucketName: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body);
  const username = body.username;
  if (typeof username !== "string") {
    throw new TypeError("Username should be a string");
  }
  const userData = mapResponseToStats(await getUserLocal(username));
  const { renderId, bucketName } = await renderVideoOnLambda({
    region: AWS_REGION,
    functionName: functionName,
    serveUrl: SITE_ID,
    composition: COMP_NAME,
    inputProps: { stats: userData },
    codec: "h264-mkv",
    imageFormat: "jpeg",
    maxRetries: 1,
    privacy: "public",
  });
  res.status(200).json({ renderId, bucketName });
}
