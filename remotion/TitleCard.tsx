import { lighten } from "polished";
import React from "react";
import { AbsoluteFill } from "remotion";
import { BACKGROUND_COLOR, BASE_COLOR } from "../src/palette";
import { ResponseType } from "../src/response-types";

const outerImage: React.CSSProperties = {
  padding: 24,
  backgroundColor: "white",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle: React.CSSProperties = {
  borderRadius: "50%",
  width: 450,
  height: 450,
  border: "6px solid " + BACKGROUND_COLOR,
};

const titleStyle: React.CSSProperties = {
  color: BASE_COLOR,
  fontFamily: "sans-serif",
  fontSize: 64,
  textAlign: "center",
  fontWeight: "bold",
  marginTop: 20,
};

const para: React.CSSProperties = {
  color: BASE_COLOR,
  fontFamily: "sans-serif",
  fontSize: 32,
  marginTop: 20,
  textAlign: "center",
};

export const TitleCard: React.FC<{
  stats: ResponseType;
}> = ({ stats }) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      <div style={outerImage}>
        <img
          alt="Your avatar"
          style={imageStyle}
          src={stats.stats.data.search.edges[0].node.avatarUrl}
        ></img>
      </div>
      <div style={titleStyle}>
        This is my
        <br />
        GitHub Wrapped
      </div>
      <div style={para}>@{stats.stats.data.search.edges[0].node.login}</div>
    </AbsoluteFill>
  );
};
