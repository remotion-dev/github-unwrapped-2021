import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { BACKGROUND_COLOR, BASE_COLOR } from "../src/palette";
import { Decoration } from "./Decoration";

const title: React.CSSProperties = {
  textAlign: "center",
  fontSize: 70,
  fontFamily: "Jelle",
  color: BASE_COLOR,
  fontWeight: "bold",
};

const subtitle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 36,
  fontFamily: "Jelle",
  color: BASE_COLOR,
  fontWeight: "bold",
  marginTop: 12,
};

export const EndCard: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      <Decoration
        start={[1, 0.5]}
        end={[0.7, 0]}
        width={width}
        height={height}
      ></Decoration>
      <Decoration
        start={[0, 0.55]}
        end={[0.5, 1]}
        width={width}
        height={height}
      ></Decoration>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={title}>Wonder how you{"'"}ll compare?</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
