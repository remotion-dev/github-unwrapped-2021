import React, { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { ResponseType } from "../src/response-types";
import groupBy from "lodash.groupby";
import chunk from "lodash.chunk";

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

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {Object.keys(groupedByMonth).map((m) => {
          const val = groupedByMonth[m];
          const chunked = chunk(val, 7);
          return (
            <div
              key={m[0]}
              style={{
                marginBottom: 120,
              }}
            >
              {chunked.map((c) => {
                return (
                  <div
                    key={c[0].date}
                    style={{ flexDirection: "row", display: "flex" }}
                  >
                    {c.map((xx) => {
                      return (
                        <div
                          key={xx.date}
                          style={{
                            backgroundColor: xx.color,
                            width: 80,
                            height: 80,
                            borderRadius: 12,
                            margin: 12,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
