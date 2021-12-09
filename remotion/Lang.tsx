import React from "react";
import { AbsoluteFill } from "remotion";
import { ResponseType } from "../src/response-types";

const title: React.CSSProperties = {
  color: "#111",
  fontWeight: "bold",
  fontSize: 70,
  fontFamily: "sans-serif",
  paddingLeft: 20,
  paddingRight: 20,
  textAlign: "center",
};

export const Lang: React.FC<{
  stats: ResponseType;
}> = ({ stats }) => {
  const languages = stats.languages.data.user.repositories.nodes.map(
    (n) => n.languages.edges[0].node
  );

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
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={title}>{lang.name}</div>
    </AbsoluteFill>
  );
};
