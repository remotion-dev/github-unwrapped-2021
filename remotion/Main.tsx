import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, Series } from "remotion";
import { ResponseType } from "../src/response-types";
import { getUserLocal } from "./get-user-local";
import { Lang } from "./Lang";
import { ManyLanguages } from "./ManyLanguages";
import { Stars } from "./Stars";
import { TitleCard } from "./TitleCard";
import music from "./music.mp3";
import { Audio } from "remotion";
import { Contributions } from "./Contrib";

export const Main: React.FC<{
  username: string;
}> = ({ username }) => {
  const [stats, setStats] = useState<ResponseType | null>(null);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    getUserLocal(username)
      .then((data) => {
        setStats(data);
        continueRender(handle);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [handle, username]);

  if (!stats) {
    return null;
  }

  return (
    <AbsoluteFill>
      <Audio src={music}></Audio>
      <Series>
        <Series.Sequence durationInFrames={60}>
          <TitleCard stats={stats}></TitleCard>
        </Series.Sequence>
        <Series.Sequence durationInFrames={140}>
          <ManyLanguages></ManyLanguages>
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} offset={-20}>
          <Lang stats={stats}></Lang>
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Stars stats={stats}></Stars>
        </Series.Sequence>
        <Series.Sequence durationInFrames={280}>
          <Contributions stats={stats}></Contributions>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
