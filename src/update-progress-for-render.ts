import { rendersCollection } from "./db/renders";
import { getRenderProgressWithFinality } from "./get-render-progress-with-finality";

const script = async () => {
  const renders = await rendersCollection();
  const withoutFinality = renders.find({ finality: null });
  while (await withoutFinality.hasNext()) {
    const thisIsMyNext = await withoutFinality.next();
    if (!thisIsMyNext) {
      continue;
    }
    await getRenderProgressWithFinality(
      thisIsMyNext,
      thisIsMyNext.account ?? 1
    );
    console.log("Done with " + thisIsMyNext.renderId);
  }
};

script()
  .then(console.log)
  .catch((err) => console.log(err));
