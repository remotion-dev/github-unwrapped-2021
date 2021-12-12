import { AwsRegion } from "@remotion/lambda";
import { mongoClient } from "./mongo";

type Render = {
  renderId: string;
  region: AwsRegion;
  username: string;
  bucketName: string;
  functionName: string;
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
  return coll.insertOne({
    region,
    renderId,
    username: username.toLowerCase(),
    bucketName,
    functionName,
  });
};

export const getRender = async (username: string) => {
  const coll = await rendersCollection();
  const render = await coll.findOne({
    username: username.toLowerCase(),
  });

  return render;
};
