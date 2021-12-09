import React, { useEffect, useState } from "react";
import { continueRender, delayRender, Series } from "remotion";
import { ResponseType } from "../src/response-types";
import { getUserLocal } from "./get-user-local";
import { Lang } from "./Lang";
import { Stars } from "./Stars";

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
    <Series>
      <Series.Sequence durationInFrames={100}>
        <Stars stats={stats}></Stars>
      </Series.Sequence>
      <Series.Sequence durationInFrames={100}>
        <Lang stats={stats}></Lang>
      </Series.Sequence>
    </Series>
  );
};
