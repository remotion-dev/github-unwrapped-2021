import { transparentize } from "polished";
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BACKGROUND_COLOR, BASE_COLOR } from "../src/palette";
import { ResponseType } from "../src/response-types";

const outerImage: React.CSSProperties = {
  padding: 24,
  backgroundColor: "white",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 0 40px " + transparentize(0.9, BASE_COLOR),
};

const imageStyle: React.CSSProperties = {
  borderRadius: "50%",
  width: 450,
  height: 450,
  border: "10px solid " + BACKGROUND_COLOR,
  overflow: "hidden",
  position: "relative",
};

const image: React.CSSProperties = {
  borderRadius: "50%",
  width: "100%",
  height: "100%",
};

const titleStyle: React.CSSProperties = {
  color: BASE_COLOR,
  fontFamily: "sans-serif",
  fontSize: 80,
  textAlign: "center",
  fontWeight: "bold",
  marginTop: 20,
};

export const TitleCard: React.FC<{
  stats: ResponseType;
}> = ({ stats }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const appear = spring({
    fps,
    frame,
    config: {
      mass: 2,
      damping: 200,
    },
  });

  const scale = interpolate(appear, [0, 1], [0.8, 1]);

  const avatarScale = interpolate(appear, [0, 1], [0, 1]);

  const rotateProg = spring({
    fps,
    frame: frame - 45,
    config: {
      damping: 200,
    },
  });

  const rotation = interpolate(rotateProg, [0, 1], [0, Math.PI]);
  const rotation2 = interpolate(rotateProg, [0, 1], [-Math.PI, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BACKGROUND_COLOR,
        perspective: 900,
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: `scale(${scale}) rotateY(${rotation}rad)`,
        }}
      >
        <div
          style={{
            ...outerImage,
            transform: `scale(${avatarScale})`,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <div style={imageStyle}>
            <Img
              style={image}
              alt="Your avatar"
              src={stats.stats.data.search.edges[0].node.avatarUrl}
            ></Img>
          </div>
          <div
            style={{
              position: "absolute",
              height: 180,
              width: "100%",
              bottom: 0,
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 110,
              fontFamily: "sans-serif",
              fontWeight: "bold",
              color: BACKGROUND_COLOR,
              paddingBottom: 38,
            }}
          >
            2021
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: `scale(${scale}) rotateY(${rotation2}rad)`,
        }}
      >
        <div style={titleStyle}>
          This is my
          <br />
          #GithubWrapped
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
