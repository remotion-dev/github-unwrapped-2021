import React, { useMemo, useState } from "react";
import {
  AbsoluteFill,
  delayRender,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ResponseType } from "../src/response-types";
import { StarEmoji } from "./StarEmoji";

const title: React.CSSProperties = {
  color: "#111",
  fontWeight: "bold",
  fontSize: 70,
  fontFamily: "sans-serif",
  paddingLeft: 20,
  paddingRight: 20,
  textAlign: "center",
};

const subtitle: React.CSSProperties = {
  color: "#111",
  fontSize: 32,
  fontFamily: "sans-serif",
  paddingLeft: 200,
  paddingRight: 200,
  textAlign: "center",
};

export const Stars: React.FC<{
  stats: ResponseType;
}> = ({ stats }) => {
  const [handle] = useState(() => delayRender());

  const data = useMemo(() => {
    const edge =
      stats.stats.data.search.edges?.[0]?.node.starredRepositories.edges ?? [];
    const starsThisYear = edge.filter(
      (e) => new Date(e.starredAt).getFullYear() === 2021
    );
    return { starsThisYear };
  }, [stats]);

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - 30,
    config: {
      damping: 80,
    },
  });

  const scaleUp = interpolate(scale, [0, 1], [1, 0.5]);
  const moveUp = interpolate(scale, [0, 1], [1000, 150]);
  const emojiUp = interpolate(scale, [0, 1], [0, -400]);

  if (!data) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scaleUp}) translateY(${emojiUp}px)`,
        }}
      >
        <StarEmoji />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${moveUp}px)`,
        }}
      >
        <br />
        <div style={title}>
          You gave {data.starsThisYear.length}{" "}
          {data.starsThisYear.length === 1 ? "star" : "stars"} to open source
          projects this year.
        </div>
        <br />
        {data.starsThisYear.length === 0 ? (
          <div style={subtitle}>It{"'"}s not too late to spread the love! </div>
        ) : (
          <div style={subtitle}>
            The most recent one was {data.starsThisYear[0].node.name} by{" "}
            {data.starsThisYear[0].node.owner.login}!
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
