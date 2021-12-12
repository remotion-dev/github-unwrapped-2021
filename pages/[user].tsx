import { AwsRegion, RenderProgress } from "@remotion/lambda";
import { Player, PlayerInternals, PlayerRef } from "@remotion/player";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { transparentize } from "polished";
import React, { useEffect, useRef, useState } from "react";
import { AbsoluteFill } from "remotion";
import { getFont } from "../remotion/font";
import { Main } from "../remotion/Main";
import { CompactStats } from "../remotion/map-response-to-stats";
import { backButton } from "../src/components/button";
import Download from "../src/components/Download";
import { Footer, FOOTER_HEIGHT } from "../src/components/Footer";
import Spinner from "../src/components/spinner";
import { getRenderOrMake } from "../src/get-render-or-make";
import { getStatsOrFetch } from "../src/get-stats-or-fetch";
import { BACKGROUND_COLOR, BASE_COLOR } from "../src/palette";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

const iosSafari = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  return iOS && webkit;
};

export const getStaticProps = async ({ params }) => {
  const { user } = params;

  if (user.length > 40) {
    console.log("Username too long");
    return { notFound: true };
  }

  try {
    const compact = await getStatsOrFetch(user);
    if (!compact) {
      return { notFound: true };
    }
    const { progress, bucketName, renderId, region, functionName } =
      await getRenderOrMake(user, compact);
    return {
      props: {
        user: compact,
        progress,
        bucketName,
        renderId,
        region,
        functionName,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  maxWidth: 800,
  margin: "auto",
  paddingLeft: 20,
  paddingRight: 20,
};

const abs: React.CSSProperties = {
  backgroundColor: BACKGROUND_COLOR,
  width: "100%",
  position: "relative",
};

const container: React.CSSProperties = {
  minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
  width: "100%",
  position: "relative",
};

const title: React.CSSProperties = {
  fontFamily: "Jelle",
  textAlign: "center",
  color: BASE_COLOR,
  marginBottom: 0,
};

const subtitle: React.CSSProperties = {
  fontFamily: "Jelle",
  textAlign: "center",
  fontSize: 20,
  color: "red",
  marginTop: 14,
  marginBottom: 0,
};

const layout: React.CSSProperties = {
  margin: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
};

getFont();

const useSizeIfClient = (ref: React.RefObject<HTMLElement>) => {
  if (typeof window === "undefined") {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return PlayerInternals.useElementSize(ref, { triggerOnWindowResize: true });
};

export default function User(props: {
  user: CompactStats | null;
  renderId: string;
  progress: RenderProgress;
  bucketName: string;
  functionName: string;
  region: AwsRegion;
}) {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const player = useRef<PlayerRef>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { user, progress, bucketName, renderId } = props;

  const router = useRouter();
  const username = ([] as string[]).concat(router.query.user)[0];

  useEffect(() => {
    if (!ready || !user) {
      return;
    }
    player.current.addEventListener("pause", () => {
      setPlaying(false);
    });
    player.current.addEventListener("ended", () => {
      setPlaying(false);
    });
    player.current.addEventListener("play", () => {
      setPlaying(true);
    });
  }, [ready, user]);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!user) {
    return (
      <div ref={ref}>
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Head>
        <title>
          {username}
          {"'"}s #GithubWrapped
        </title>
        <meta property="og:title" content="My page title" key="title" />
        <meta property="og:image" content="/flash.png" />
        <meta
          name="description"
          content={`My coding 2021 in review. Get your own personalized video as well!`}
        />
        <link rel="icon" href="/fav.png" />
      </Head>
      <div style={abs}>
        <div style={container}>
          <header style={style}>
            <br></br>
            <br></br>
            <h1 style={title}>Here is your #GithubWrapped!</h1>
            <h3 style={subtitle}>@{username}</h3>
            <br></br>
            {user ? (
              <div
                style={{
                  position: "relative",
                }}
              >
                <Player
                  ref={player}
                  component={Main}
                  compositionHeight={1080}
                  compositionWidth={1080}
                  durationInFrames={990}
                  fps={30}
                  style={{
                    ...layout,
                    boxShadow: "0 0 10px " + transparentize(0.8, BASE_COLOR),
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                  inputProps={{
                    stats: user,
                    enableDecoration: false,
                  }}
                ></Player>
                <AbsoluteFill
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    // @ts-expect-error
                    player.current.toggle(e);
                  }}
                >
                  {playing ? null : (
                    <div
                      style={{
                        width: 200,
                        height: 200,
                        backgroundColor: "white",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        boxShadow:
                          "0 0 40px " + transparentize(0.9, BASE_COLOR),
                      }}
                    >
                      <svg
                        style={{
                          height: 60,
                          transform: `translateX(3px)`,
                        }}
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill={BASE_COLOR}
                          d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                        ></path>
                      </svg>
                      <br />
                      <div
                        style={{
                          color: BASE_COLOR,
                          fontFamily: "Jelle",
                          textTransform: "uppercase",
                          fontSize: 18,
                        }}
                      >
                        Click to play
                      </div>
                    </div>
                  )}
                </AbsoluteFill>
              </div>
            ) : null}
            <div
              style={{
                height: 40,
              }}
            ></div>
            <div style={layout}>
              <p
                style={{
                  color: BASE_COLOR,
                  fontFamily: "Jelle",
                  textAlign: "center",
                }}
              >
                Download your video and tweet it using{" "}
                <span
                  style={{
                    color: "black",
                  }}
                >
                  #GithubWrapped
                </span>{" "}
                hashtag!
              </p>
              <Download
                initialProgress={progress}
                bucketName={bucketName}
                renderId={renderId}
                username={username}
                functionName={props.functionName}
                region={props.region}
              ></Download>
              {iosSafari() ? (
                <p
                  style={{
                    color: BASE_COLOR,
                    fontFamily: "Jelle",
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  Tip for iOS Safari: Long press the {'"'}Download button{'"'},
                  then press {'"'}Download Linked File{'"'} to save the video
                  locally.
                </p>
              ) : null}
              <br></br>
              <Link href="/" passHref>
                <button style={backButton}>View for another user</button>
              </Link>
              <br />
              <br />
              <br />
            </div>
          </header>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
