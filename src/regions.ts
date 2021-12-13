import { AwsRegion } from "@remotion/lambda";

export const regions: { [key in AwsRegion]: string } = {
  "ap-northeast-1": "remotion-render-4fmqfux9di",
  "ap-south-1": "remotion-render-0o3apxbmkc",
  "ap-southeast-1": "remotion-render-pbma6vbbo2",
  "ap-southeast-2": "remotion-render-d86x3345fa",
  "eu-central-1": "remotion-render-90ft7r8v0n",
  "eu-west-1": "remotion-render-9d0uq5zh7g",
  "eu-west-2": "remotion-render-mp3ucgfck5",
  "us-east-1": "remotion-render-wqoe3pfmzh",
  "us-east-2": "remotion-render-yzyrh733bk",
  "us-west-2": "remotion-render-8iutdsvlm4",
};

export const getRandomRegion = (): AwsRegion => {
  const regions: AwsRegion[] = [
    "ap-northeast-1",
    "ap-south-1",
    "ap-southeast-1",
    "ap-southeast-2",
    "eu-central-1",
    "eu-west-1",
    "eu-west-2",
    "us-east-1",
    "us-east-2",
    "us-west-2",
  ];
  return regions[Math.floor(Math.random() * regions.length)];
};
