import { getRenderProgress } from "@remotion/lambda";
import { WithId } from "mongodb";
import { RenderProgressOrFinality } from "../pages/api/progress";
import { Render, updateRenderWithFinality } from "./db/renders";
import { functionName } from "./function-name";
import { getFinality } from "./get-render-or-make";

export const getRenderProgressWithFinality = async (
  render: WithId<Render>
): Promise<RenderProgressOrFinality> => {
  if (render.finality) {
    return {
      type: "finality",
      finality: render.finality,
    };
  }

  const progress = await getRenderProgress({
    renderId: render.renderId,
    bucketName: render.bucketName,
    functionName: functionName,
    region: render.region,
  });

  const finality = getFinality(progress);

  if (finality) {
    await updateRenderWithFinality(
      render.renderId,
      render.username,
      render.region,
      finality
    );
    console.log(`Updated ${render.renderId} with finality`, finality);
    return {
      type: "finality",
      finality,
    };
  }

  return {
    type: "progress",
    progress,
  };
};
