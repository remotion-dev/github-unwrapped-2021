import { lighten } from "polished";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PINK, PINK_BACKGROUND } from "../src/palette";
import { CompactStats, Weekday } from "./map-response-to-stats";

const weekdayToName = (weekday: Weekday) => {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][weekday];
};

const label: React.CSSProperties = {
  textAlign: "center",
  color: PINK,
  fontFamily: "sans-serif",
  marginTop: 20,
  fontWeight: "bold",
  fontSize: 36,
};

const title: React.CSSProperties = {
  color: PINK,
  fontWeight: "bold",
  fontSize: 80,
  fontFamily: "sans-serif",
  paddingLeft: 50,
  paddingRight: 50,
  textAlign: "center",
  marginBottom: 100,
};

const higher = 500;

export const TopWeekDays: React.FC<{
  stats: CompactStats;
}> = ({ stats }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const lower = Math.max(150, higher * (1 / stats.weekdays.ratio));

  const progress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: PINK_BACKGROUND,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={title}>
        {weekdayToName(stats.weekdays.least)} is my most productive day.
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          height: 500,
        }}
      >
        <div>
          <div
            style={{
              width: 200,
              height: interpolate(progress, [0, 1], [50, lower]),
              borderRadius: 30,
              backgroundColor: lighten(0.1, PINK),
              display: "flex",
              color: interpolateColors(
                progress,
                [0, 1],
                [lighten(0.1, PINK), PINK_BACKGROUND]
              ),
              justifyContent: "center",
              alignItems: "flex-end",
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: 24,
              paddingBottom: interpolate(progress, [0, 1], [0, 30]),
            }}
          >
            {stats.weekdays.leastCount}
          </div>
          <div style={{ ...label, color: lighten(0.1, PINK) }}>
            {weekdayToName(stats.weekdays.least)}
          </div>
        </div>
        <div style={{ width: 100 }}></div>
        <div>
          <div
            style={{
              width: 200,
              height: interpolate(progress, [0, 1], [50, higher]),
              borderRadius: 30,
              backgroundColor: PINK,
              display: "flex",
              color: interpolateColors(
                progress,
                [0, 1],
                [PINK, PINK_BACKGROUND]
              ),
              justifyContent: "center",
              alignItems: "flex-end",
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: 24,
              paddingBottom: interpolate(progress, [0, 1], [0, 30]),
            }}
          >
            {stats.weekdays.mostCount}
          </div>
          <div style={label}>{weekdayToName(stats.weekdays.most)}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
