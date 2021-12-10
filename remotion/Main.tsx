import React from "react";
import { AbsoluteFill, Audio, Series } from "remotion";
import { ResponseType } from "../src/response-types";
import { Contributions } from "./Contrib";
import { EndCard } from "./EndCard";
import { Lang } from "./Lang";
import { ManyLanguages } from "./ManyLanguages";
import { Stars } from "./Stars";
import { TitleCard } from "./TitleCard";

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
        <Series.Sequence durationInFrames={90}>
          <TitleCard stats={stats}></TitleCard>
        </Series.Sequence>
        <Series.Sequence durationInFrames={140}>
          <ManyLanguages></ManyLanguages>
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} offset={-20}>
          <Lang stats={stats}></Lang>
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <Stars stats={stats}></Stars>
        </Series.Sequence>
        <Series.Sequence durationInFrames={280}>
          <Contributions stats={stats}></Contributions>
        </Series.Sequence>
        <Series.Sequence durationInFrames={280}>
          <EndCard></EndCard>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
