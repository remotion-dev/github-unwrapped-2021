import Head from "next/head";
import { useRouter } from "next/router";
import { lighten } from "polished";
import React, { useCallback, useState } from "react";
import { getFont } from "../remotion/font";
import { BACKGROUND_COLOR, BASE_COLOR } from "../src/palette";

const input = (loading: boolean): React.CSSProperties => ({
  padding: 16,
  border: "2px solid transparent",
  borderRadius: 8,
  fontSize: 28,
  fontFamily: "inherit",
});

const headerStyle: React.CSSProperties = {
  backgroundColor: BACKGROUND_COLOR,
  height: "100%",
  width: "100%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
};

const h1: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: 48,
  color: BASE_COLOR,
  fontFamily: "Jelle",
};

const button: React.CSSProperties = {
  appearance: "none",
  padding: "14px 28px",
  border: 0,
  color: "white",
  backgroundColor: lighten(0.1, BASE_COLOR),
  borderRadius: 10,
  fontSize: 20,
  fontWeight: "bold",
  fontFamily: "Jelle",
  borderBottom: "3px solid " + BASE_COLOR,
};

const paragraph: React.CSSProperties = {
  color: BASE_COLOR,
};

getFont();

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (username.trim() === "") {
        return;
      }
      setLoading(true);
      router.push(`/${username}`);
    },
    [router, username]
  );

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault();
      setUsername(e.target.value);
    },
    []
  );

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header style={headerStyle}>
        <div style={h1}>Your coding year in review</div>
        <p style={paragraph}>
          Get a personalized video of your Github activity in 2021. Type your
          username to get started!
        </p>
        <br />

        <form onSubmit={onSubmit}>
          <input
            autoFocus
            value={username}
            onChange={onChange}
            type={"text"}
            disabled={loading}
            style={input(loading)}
            placeholder="GitHub username"
          ></input>
          <br />
          <br />
          <input
            style={button}
            type="submit"
            value={loading ? "Getting your Wrapped..." : "Get your Wrapped"}
          />
        </form>
      </header>
    </div>
  );
}
