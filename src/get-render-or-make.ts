import {
  AwsRegion,
  renderMediaOnLambda,
  RenderProgress,
} from "@remotion/lambda/client";
import { RenderProgressOrFinality } from "../pages/api/progress";
import { CompactStats } from "../remotion/map-response-to-stats";
import { COMP_NAME, SITE_ID } from "./config";
import {
  Finality,
  getRender,
  lockRender,
  saveRender,
  updateRenderWithFinality,
} from "./db/renders";
import { functionName } from "./function-name";
import { getRandomAwsAccount } from "./get-random-aws-account";
import { getRenderProgressWithFinality } from "./get-render-progress-with-finality";
import { slackbot } from "./post-to-slack";
import { getRandomRegion } from "./regions";
import { setEnvForKey } from "./set-env-for-key";

export const getRenderOrMake = async (
  username: string,
  stats: CompactStats
): Promise<RenderProgressOrFinality> => {
  const cache = await getRender(username);
  let _renderId: string | null = cache?.renderId ?? null;
  let _region: AwsRegion | null = cache?.region ?? null;
  try {
    if (cache) {
      const progress = await getRenderProgressWithFinality(
        cache,
        cache.account ?? 1
      );
      return progress;
    }
    const region = getRandomRegion();
    const account = getRandomAwsAccount();
    console.log(`Selected account ${account} to render`);
    await lockRender(region, username, account);

    setEnvForKey(account);

    const { renderId, bucketName } = await renderMediaOnLambda({
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
    });
    const render = await getRender(username);
    if (!render) {
      throw new Error(`Didn't have error for ${username}`);
    }
    const progress = await getRenderProgressWithFinality(render, account);
    return progress;
  } catch (err) {
    slackbot.send("#wrapped", [
      `Failed to render video for ${username}`,
      (err as Error).stack,
    ]);
    if (_renderId && _region) {
      await updateRenderWithFinality(_renderId, username, _region, {
        type: "error",
        errors: (err as Error).stack as string,
      });
    }
    return {
      finality: {
        type: "error",
        errors: (err as Error).stack as string,
      },
      type: "finality",
    };
  }
};

export const getFinality = (
  renderProgress: RenderProgress
): Finality | null => {
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
