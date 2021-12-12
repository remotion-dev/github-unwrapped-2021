import {
  AwsRegion,
  getRenderProgress,
  RenderProgress,
  renderVideoOnLambda,
} from "@remotion/lambda";
import { CompactStats } from "../remotion/map-response-to-stats";
import { COMP_NAME, SITE_ID } from "./config";
import { getRender, saveRender } from "./db/renders";
import { getRandomRegion, regions } from "./regions";

type GetRenderOrMake = {
  renderId: string;
  bucketName: string;
  progress: RenderProgress;
  functionName: string;
  region: AwsRegion;
};

export const getRenderOrMake = async (
  username: string,
  stats: CompactStats
): Promise<GetRenderOrMake> => {
  const cache = await getRender(username);

  if (cache) {
    const progress = await getRenderProgress({
      bucketName: cache.bucketName,
      functionName: regions[cache.region],
      region: cache.region,
      renderId: cache.renderId,
    });
    return {
      progress,
      bucketName: cache.bucketName,
      renderId: cache.renderId,
      functionName: cache.functionName,
      region: cache.region,
    };
  }
  const region = getRandomRegion();

  const { renderId, bucketName } = await renderVideoOnLambda({
    region: region,
    functionName: regions[region],
    serveUrl: SITE_ID,
    composition: COMP_NAME,
    inputProps: { stats: stats },
    codec: "h264-mkv",
    imageFormat: "jpeg",
    maxRetries: 1,
    framesPerLambda: 80,
    privacy: "public",
  });
  saveRender({
    region: region,
    bucketName,
    renderId,
    username,
    functionName: regions[region],
  });
  const progress = await getRenderProgress({
    bucketName: bucketName,
    functionName: regions[region],
    region: region,
    renderId,
  });
  return {
    renderId,
    bucketName,
    progress,
    region,
    functionName: regions[region],
  };
};
