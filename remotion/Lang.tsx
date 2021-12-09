import makeColorMoreChill from "make-color-more-chill";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ResponseType } from "../src/response-types";

const title: React.CSSProperties = {
  color: "#111",
  fontWeight: "bold",
  fontSize: 100,
  fontFamily: "sans-serif",
  paddingLeft: 20,
  paddingRight: 20,
  textAlign: "center",
};

export const Lang: React.FC<{
  stats: ResponseType;
}> = ({ stats }) => {
  const languages = stats.languages.data.user.repositories.nodes
    .filter((n) => n.languages.edges?.[0])
    .map((n) => n.languages.edges[0].node);

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

  const langs: { [key: string]: number } = {};
  for (const lang of languages) {
    if (!langs[lang.id]) {
      langs[lang.id] = 0;
    }
    langs[lang.id]++;
  }

  const topEntries = Object.entries(langs)
    .sort((a, b) => a[1] - b[1])
    .reverse();

  const lang = languages.find((l) => l.id === topEntries[0][0]);

  if (!lang) {
    return null;
  }

  const rotate = interpolate(
    rotateProgress,
    [0, 0.5, 0.500001, 1],
    [0, Math.PI / 2, -Math.PI / 2, 0]
  );

  const text =
    rotateProgress < 0.5
      ? "But the one \n that's special to you is"
      : lang.name;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: makeColorMoreChill(lang.color, "#000"),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: `${interpolate(scale, [0, 1], [50, 0])}%`,
        transform: `scale(${scale})`,
        perspective: 2000,
      }}
    >
      <div
        style={{ ...title, color: "white", transform: `rotateY(${rotate}rad)` }}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </AbsoluteFill>
  );
};
