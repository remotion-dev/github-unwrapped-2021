import { AwsRegion } from "@remotion/lambda";

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
