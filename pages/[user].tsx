import { Player } from "@remotion/player";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { getFont } from "../remotion/font";
import { Main } from "../remotion/Main";
import {
  CompactStats,
  mapResponseToStats,
} from "../remotion/map-response-to-stats";
import Download from "../src/components/Download";
import { getAll } from "../src/get-all";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export const getStaticProps = async ({ params }) => {
  const { user } = params;

  if (user.length > 40) {
    console.log("Username too long");
    return { notFound: true };
  }

  try {
    const ast = await getAll(user, process.env.GITHUB_TOKEN);
    if (!ast.data.user) {
      return { notFound: true };
    }
    const compact = mapResponseToStats(ast);
    return { props: { user: compact } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

getFont();

export default function User({ user }: { user: CompactStats | null }) {
  const router = useRouter();
  const username = ([] as string[]).concat(router.query.user)[0];

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header style={style}>
        {user ? (
          <>
            <Player
              // TODO: Investigate
              numberOfSharedAudioTags={0}
              component={Main}
              compositionHeight={1080}
              compositionWidth={1080}
              durationInFrames={900}
              fps={30}
              style={{
                width: 600,
                margin: "auto",
                maxWidth: "100%",
              }}
              controls
              inputProps={{
                stats: user,
              }}
            ></Player>
            <Download username={username}></Download>
          </>
        ) : null}
        <Link href="/" passHref>
          <button>Go back</button>
        </Link>
      </header>
    </div>
  );
}
