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
import { CompactStats } from "./map-response-to-stats";

const outerImage: React.CSSProperties = {
  padding: 24,
  backgroundColor: "white",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 0 40px " + transparentize(0.9, BASE_COLOR),
  position: "relative",
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
  fontFamily: "Jelle",
  fontSize: 80,
  textAlign: "center",
  fontWeight: "bold",
  marginTop: 20,
};

export const TitleCard: React.FC<{
  stats: CompactStats;
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
    frame: frame - 60,
    config: {
      damping: 200,
    },
  });

  const scaleY = interpolate(rotateProg, [0, 1], [1, -1]);
  const scaleY2 = interpolate(rotateProg, [0, 1], [-1, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      {scaleY > 0 ? (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",

            transform: `scale(${scaleY}, ${scale})`,
          }}
        >
          <div
            style={{
              transform: `scale(${avatarScale})`,
            }}
          >
            <div
              style={{
                ...outerImage,
                borderRadius: "50%",
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
              }}
            >
              <div style={imageStyle}>
                <Img style={image} alt="Your avatar" src={stats.avatar}></Img>
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
                  fontFamily: "Jelle",
                  fontWeight: "bold",
                  color: BACKGROUND_COLOR,
                  paddingBottom: 38,
                  overflow: "hidden",
                }}
              >
                2021
              </div>
            </div>
          </div>
        </AbsoluteFill>
      ) : null}
      {scaleY2 > 0 ? (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${scaleY2}, ${scale})`,
          }}
        >
          <div style={titleStyle}>
            This is my
            <br />
            #GithubWrapped
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
