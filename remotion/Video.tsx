import { Composition } from "remotion";
import { COMP_NAME } from "../src/config";
import { all } from "./all";
import { MyComp } from "./Composition";
import { Contributions } from "./Contrib";
import { Main } from "./Main";
import { ManyLanguages } from "./ManyLanguages";
import { mapResponseToStats } from "./map-response-to-stats";
import { StarEmoji } from "./StarEmoji";
import { Stars } from "./Stars";
import { TitleCard } from "./TitleCard";
import { TransitionDemo } from "./TransitionDemo";

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
        id="stars"
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
        durationInFrames={900}
        fps={30}
        height={1080}
        width={1080}
        id={COMP_NAME}
        defaultProps={{
          stats: mapResponseToStats(all),
        }}
      ></Composition>
      <Composition
        component={Contributions}
        durationInFrames={400}
        fps={30}
        height={1080}
        width={1080}
        id={"contributions"}
        defaultProps={{
          stats: mapResponseToStats(all),
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
      <Composition
        component={TitleCard}
        durationInFrames={300}
        fps={30}
        height={1080}
        width={1080}
        id="title-card"
        defaultProps={{
          stats: mapResponseToStats(all),
        }}
      ></Composition>
      <Composition
        component={TransitionDemo}
        durationInFrames={300}
        fps={30}
        height={1080}
        width={1080}
        id="transition"
      ></Composition>
    </>
  );
};
