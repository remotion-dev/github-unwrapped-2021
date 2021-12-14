import {
  AwsRegion,
  RenderProgress,
  renderVideoOnLambda,
} from "@remotion/lambda";
import { RenderProgressOrFinality } from "../pages/api/progress";
import { CompactStats } from "../remotion/map-response-to-stats";
import { COMP_NAME, SITE_ID } from "./config";
import {
  Finality,
  getRender,
  saveRender,
  updateRenderWithFinality,
} from "./db/renders";
import { functionName } from "./function-name";
import { getRenderProgressWithFinality } from "./get-render-progress-with-finality";
import { slackbot } from "./post-to-slack";
import { getRandomRegion } from "./regions";

export const getRenderOrMake = async (
  username: string,
  stats: CompactStats
): Promise<RenderProgressOrFinality> => {
  const cache = await getRender(username);
  let _renderId: string | null = cache?.renderId ?? null;
  let _region: AwsRegion | null = cache?.region ?? null;
  try {
    if (cache) {
      const progress = await getRenderProgressWithFinality(cache);
      return progress;
    }
    const region = getRandomRegion();

    const { renderId, bucketName } = await renderVideoOnLambda({
      region: region,
      functionName: functionName,
      serveUrl: SITE_ID,
      composition: COMP_NAME,
      inputProps: { stats: stats },
      codec: "h264-mkv",
      imageFormat: "jpeg",
      maxRetries: 1,
      framesPerLambda: 80,
      privacy: "public",
    });
    _renderId = renderId;
    _region = region;
    await saveRender({
      region: region,
      bucketName,
      renderId,
      username,
      functionName,
    });
    const render = await getRender(username);
    if (!render) {
      throw new Error(`Didn't have error for ${username}`);
    }
    const progress = await getRenderProgressWithFinality(render);
    return progress;
  } catch (err) {
    slackbot.send("#wrapped", [
      `Failed to render video for ${username}`,
      (err as Error).stack,
    ]);
    if (_renderId && _region) {
      await updateRenderWithFinality(_renderId, cache.username, _region, {
        type: "error",
        errors: (err as Error).stack,
      });
    }
    return {
      finality: {
        type: "error",
        errors: (err as Error).stack,
      },
      type: "finality",
    };
  }
};

export const getFinality = (renderProgress: RenderProgress): Finality => {
  if (renderProgress.outputFile) {
    return {
      type: "success",
      url: renderProgress.outputFile,
    };
  }
  if (renderProgress.fatalErrorEncountered) {
    return {
      type: "error",
      errors: renderProgress.errors[0].stack,
    };
  }
  return null;
};
