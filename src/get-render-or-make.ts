import {
  getRenderProgress,
  RenderProgress,
  renderVideoOnLambda,
} from "@remotion/lambda";
import { CompactStats } from "../remotion/map-response-to-stats";
import { AWS_REGION, COMP_NAME, functionName, SITE_ID } from "./config";
import { getRender, saveRender } from "./db/renders";

type GetRenderOrMake = {
  renderId: string;
  bucketName: string;
  progress: RenderProgress;
};

export const getRenderOrMake = async (
  username: string,
  stats: CompactStats
): Promise<GetRenderOrMake> => {
  const cache = await getRender(username);

  if (cache) {
    const progress = await getRenderProgress({
      bucketName: cache.bucketName,
      functionName,
      region: cache.region,
      renderId: cache.renderId,
    });
    return {
      progress,
      bucketName: cache.bucketName,
      renderId: cache.renderId,
    };
  }

  const { renderId, bucketName } = await renderVideoOnLambda({
    region: AWS_REGION,
    functionName: functionName,
    serveUrl: SITE_ID,
    composition: COMP_NAME,
    inputProps: { stats: stats },
    codec: "h264-mkv",
    imageFormat: "jpeg",
    maxRetries: 1,
    privacy: "public",
  });
  saveRender({
    region: AWS_REGION,
    bucketName,
    renderId,
    username,
  });
  const progress = await getRenderProgress({
    bucketName: bucketName,
    functionName,
    region: AWS_REGION,
    renderId,
  });
  return { renderId, bucketName, progress };
};
