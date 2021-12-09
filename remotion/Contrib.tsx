import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, Series } from "remotion";
import { ResponseType } from "../src/response-types";
import groupBy from "lodash.groupby";
import chunk from "lodash.chunk";
import { lighten } from "polished";
import { BACKGROUND_COLOR } from "../src/palette";
import { Green } from "./Green";
import { TotalContributions } from "./TotalContributions";

export const Contributions: React.FC<{
  stats: ResponseType;
}> = ({ stats }) => {
  const allDays = useMemo(() => {
    return stats.contributions.data.user.contributionsCollection.contributionCalendar.weeks
      .map((w) => w.contributionDays)
      .flat(1);
  }, [
    stats.contributions.data.user.contributionsCollection.contributionCalendar
      .weeks,
  ]);

  const groupedByMonth = useMemo(() => {
    return groupBy(allDays, (d) => d.date.split("-")[1]);
  }, [allDays]);

  const totalContributions = useMemo(() => {
    return allDays.map((d) => d.contributionCount).reduce((a, b) => a + b, 0);
  }, [allDays]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: lighten(0.08, BACKGROUND_COLOR),
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Series>
          {Object.keys(groupedByMonth).map((m, i) => {
            const val = groupedByMonth[m];
            const chunked = chunk(val, 7);
            return (
              <Series.Sequence
                key={m[0]}
                durationInFrames={i === 0 ? 35 : i === 11 ? 33 : 12}
                layout="none"
              >
                <Green chunked={chunked} i={i}></Green>
              </Series.Sequence>
            );
          })}
          <Series.Sequence durationInFrames={50}>
            <TotalContributions
              totalContributions={totalContributions}
            ></TotalContributions>
          </Series.Sequence>
        </Series>
      </div>
    </AbsoluteFill>
  );
};
