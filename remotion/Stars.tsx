import React, { useEffect, useMemo, useState } from "react";
import { AbsoluteFill, continueRender, delayRender } from "remotion";
import { getUser, Stats } from "../src/get-user";
import { getUserLocal } from "./get-user-local";
import { StarEmoji } from "./StarEmoji";

const title: React.CSSProperties = {
  color: "#111",
  fontWeight: "bold",
  fontSize: 70,
  fontFamily: "sans-serif",
  paddingLeft: 20,
  paddingRight: 20,
  textAlign: "center",
};

const subtitle: React.CSSProperties = {
  color: "#111",
  fontSize: 32,
  fontFamily: "sans-serif",
  paddingLeft: 200,
  paddingRight: 200,
  textAlign: "center",
};

export const Stars: React.FC<{
  username: string;
}> = ({ username }) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    getUserLocal(username)
      .then((data) => {
        setStats(data);
        continueRender(handle);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [handle, username]);

  const data = useMemo(() => {
    if (!stats) {
      return null;
    }

    const edge =
      stats.data.search.edges?.[0]?.node.starredRepositories.edges ?? [];
    const starsThisYear = edge.filter(
      (e) => new Date(e.starredAt).getFullYear() === 2021
    );
    return { starsThisYear };
  }, [stats]);

  if (!data) {
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
      <StarEmoji />
      <br />
      <div style={title}>
        You gave {data.starsThisYear.length}{" "}
        {data.starsThisYear.length === 1 ? "star" : "stars"} to open source
        projects this year.
      </div>
      <br />
      {data.starsThisYear.length === 0 ? (
        <div style={subtitle}>It{"'"}s not too late to spread the love! </div>
      ) : (
        <div style={subtitle}>
          The most recent one was{" "}
          <strong>{data.starsThisYear[0].node.name}</strong> by{" "}
          <strong>{data.starsThisYear[0].node.owner.login}</strong>!
        </div>
      )}
    </AbsoluteFill>
  );
};
