import React from "react";
import { AbsoluteFill, Audio, Series } from "remotion";
import { ResponseType } from "../src/response-types";
import { Contributions } from "./Contrib";
import { EndCard } from "./EndCard";
import { Lang } from "./Lang";
import { ManyLanguages } from "./ManyLanguages";
import { Stars } from "./Stars";
import { TitleCard } from "./TitleCard";
import { Transition } from "./Transition";

export const Main: React.FC<{
  stats: ResponseType;
}> = ({ stats }) => {
  if (!stats) {
    return null;
  }

  return (
    <AbsoluteFill>
      <Audio src="https://jonnyburger.s3.eu-central-1.amazonaws.com/wrapped-music.mp3"></Audio>
      <Series>
        <Series.Sequence durationInFrames={120}>
          <TitleCard stats={stats}></TitleCard>
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} offset={-20}>
          <Transition>
            <ManyLanguages></ManyLanguages>
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} offset={-20}>
          <Transition>
            <Lang stats={stats}></Lang>
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} offset={-20}>
          <Transition>
            <Stars stats={stats}></Stars>
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={280} offset={-20}>
          <Transition>
            <Contributions stats={stats}></Contributions>
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={280}>
          <Transition>
            <EndCard></EndCard>
          </Transition>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
