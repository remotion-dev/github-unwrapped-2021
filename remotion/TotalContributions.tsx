import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BASE_COLOR } from "../src/palette";

const title: React.CSSProperties = {
  textAlign: "center",
  fontSize: 160,
  fontFamily: "sans-serif",
  color: BASE_COLOR,
  fontWeight: "bold",
};

export const TotalContributions: React.FC<{
  totalContributions: number;
}> = ({ totalContributions }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const prog = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  const num = interpolate(prog, [0, 0.9], [0, totalContributions], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(prog, [0, 1], [0.6, 1.2]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ ...title, transform: `scale(${scale})` }}>
        {Math.round(num)}
      </div>
    </AbsoluteFill>
  );
};
