import makeColorMoreChill from "make-color-more-chill";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CompactStats } from "./map-response-to-stats";

const title: React.CSSProperties = {
  color: "#111",
  fontWeight: "bold",
  fontSize: 80,
  fontFamily: "Jelle",
  paddingLeft: 20,
  paddingRight: 20,
  textAlign: "center",
};

export const Lang: React.FC<{
  stats: CompactStats;
}> = ({ stats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  const rotateProgress = spring({
    fps,
    frame: frame - 60,
    config: {
      damping: 200,
    },
  });

  if (!stats.topLanguage) {
    return null;
  }

  const rotate = interpolate(
    rotateProgress,
    [0, 0.5, 0.500001, 1],
    [0, Math.PI / 2, -Math.PI / 2, 0]
  );

  const text =
    rotateProgress < 0.5
      ? "there's one that I like the most!"
      : stats.topLanguage.name;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: makeColorMoreChill(
          stats.topLanguage.color ?? "#000",
          "#000"
        ),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: `${interpolate(scale, [0, 1], [50, 0])}%`,
        perspective: 2000,
      }}
    >
      <div
        style={{
          ...title,
          fontSize: rotateProgress < 0.5 ? 80 : 200,
          color: "white",
          transform: `rotateY(${rotate}rad)`,
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </AbsoluteFill>
  );
};
