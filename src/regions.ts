import { AwsRegion } from "@remotion/lambda";

export const regions: { [key in AwsRegion]: string } = {
  "ap-northeast-1": "remotion-render-16p7u8jqa3",
  "ap-south-1": "remotion-render-ucag5jh5fz",
  "ap-southeast-1": "remotion-render-sh4zftktqx",
  "ap-southeast-2": "remotion-render-ti2do2gpmr",
  "eu-central-1": "remotion-render-j7xk1p09kl",
  "eu-west-1": "remotion-render-xvjz96lr6n",
  "eu-west-2": "remotion-render-8bvyarmp5t",
  "us-east-1": "remotion-render-hd1y0kwdcf",
  "us-east-2": "remotion-render-k3tilmhzx4",
  "us-west-2": "remotion-render-262eahg3yx",
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
