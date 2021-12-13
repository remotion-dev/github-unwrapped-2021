import { AwsRegion } from "@remotion/lambda";
import { WithId } from "mongodb";
import { slackbot } from "../post-to-slack";
import { mongoClient } from "./mongo";

export type Finality =
  | {
      type: "success";
      url: string;
    }
  | {
      type: "error";
      errors: string;
    }
  | null;

export type Render = {
  renderId: string;
  region: AwsRegion;
  username: string;
  bucketName: string;
  functionName: string;
  finality: Finality;
};

export const rendersCollection = async () => {
  const client = await mongoClient;
  return client.db("wrapped").collection<Render>("renders");
};

export const saveRender = async ({
  region,
  username,
  renderId,
  bucketName,
  functionName,
}: {
  region: AwsRegion;
  username: string;
  renderId: string;
  bucketName: string;
  functionName: string;
}) => {
  const coll = await rendersCollection();
  await coll.insertOne({
    region,
    renderId,
    username: username.toLowerCase(),
    bucketName,
    functionName,
    finality: null,
  });
};

export const updateRenderWithFinality = async (
  renderId: string,
  username: string,
  region: AwsRegion,
  finality: Finality
) => {
  if (finality.type === "success") {
    slackbot.send("#wrapped", [`Successfully rendered video for ${username}.`]);
  } else {
    slackbot.send("#wrapped", [`Failed to render video for ${username}!`]);
  }
  const coll = await rendersCollection();
  return coll.updateOne(
    {
      renderId,
      region,
    },
    {
      $set: {
        finality: finality,
      },
    }
  );
};

export const getRender = async (
  username: string
): Promise<WithId<Render> | null> => {
  const coll = await rendersCollection();
  const render = await coll.findOne({
    username: username.toLowerCase(),
  });

  return render ?? null;
};
