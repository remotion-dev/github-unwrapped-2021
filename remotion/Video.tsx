import { Composition } from "remotion";
import { COMP_NAME } from "../src/config";
import { MyComp } from "./Composition";
import { Main } from "./Main";
import { ManyLanguages } from "./ManyLanguages";
import { StarEmoji } from "./StarEmoji";
import { Stars } from "./Stars";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        component={MyComp}
        durationInFrames={300}
        fps={30}
        height={1080}
        width={1080}
        id={"wrapped"}
      ></Composition>
      <Composition
        component={Stars}
        durationInFrames={300}
        fps={30}
        height={1080}
        width={1080}
        id={COMP_NAME}
      ></Composition>
      <Composition
        component={StarEmoji}
        durationInFrames={300}
        fps={30}
        height={1080}
        width={1080}
        id="star-emoji"
      ></Composition>
      <Composition
        component={Main}
        durationInFrames={300}
        fps={30}
        height={1080}
        width={1080}
        id="main"
        defaultProps={{
          username: "JonnyBurger",
        }}
      ></Composition>
      <Composition
        component={ManyLanguages}
        durationInFrames={300}
        fps={30}
        height={1080}
        width={1080}
        id="many-languages"
      ></Composition>
    </>
  );
};
