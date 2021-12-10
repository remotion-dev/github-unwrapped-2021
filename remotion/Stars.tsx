import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLUE, BLUE_BACKGROUND } from "../src/palette";
import { CompactStats } from "./map-response-to-stats";
import { StarEmoji } from "./StarEmoji";

const title: React.CSSProperties = {
  color: BLUE,
  fontWeight: "bold",
  fontSize: 70,
  fontFamily: "sans-serif",
  paddingLeft: 20,
  paddingRight: 20,
  textAlign: "center",
};

export const Stars: React.FC<{
  stats: CompactStats;
}> = ({ stats }) => {
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

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BLUE_BACKGROUND,
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
          {stats.starsThisYear} {stats.starsThisYear === 1 ? "repo" : "repos"}{" "}
          deserved <br /> my star this year.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
