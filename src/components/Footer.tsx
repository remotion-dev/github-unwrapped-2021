import Link from "next/link";
import { lighten } from "polished";
import React from "react";
import { BASE_COLOR } from "../palette";

export const FOOTER_HEIGHT = 50;

const container: React.CSSProperties = {
  height: FOOTER_HEIGHT,
  fontFamily: "Jelle",
  display: "flex",
  alignItems: "center",
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: lighten(0.8, BASE_COLOR),
  color: BASE_COLOR,
};

export const Footer: React.FC = () => {
  return (
    <div style={container}>
      <div>
        Built with{" "}
        <a
          target="_blank"
          style={{
            color: lighten(0.1, BASE_COLOR),
          }}
          href="https://remotion.dev"
          rel="noreferrer"
        >
          Remotion
        </a>
        . Not affiliated with GitHub.
      </div>
      <div
        style={{
          flex: 1,
        }}
      ></div>
      <div>
        <Link href="/faq" passHref>
          <span
            style={{
              color: lighten(0.1, BASE_COLOR),
            }}
          >
            FAQ
          </span>
        </Link>
      </div>
    </div>
  );
};
