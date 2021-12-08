import { Composition } from "remotion";
import { MyComp } from "./Composition";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        component={MyComp}
        durationInFrames={300}
        fps={30}
        height={1080}
        width={1080}
        id="wrapped"
      ></Composition>
    </>
  );
};
