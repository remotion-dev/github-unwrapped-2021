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
      <h1 style={titleStyle}>
        {stats.stats.data.search.edges[0].node.login}
        {"'"}s
        <br />
        GitHub Wrapped
      </h1>
      <p>presented by Remotion</p>
    </AbsoluteFill>
  );
};
