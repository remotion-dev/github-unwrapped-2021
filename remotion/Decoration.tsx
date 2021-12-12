import React, { SVGProps, useEffect, useRef } from "react";
import { AbsoluteFill, interpolate, random } from "remotion";
import SimplexNoise from "simplex-noise";
import { BACKGROUND_COLOR, LINE_COLOR } from "../src/palette";
import { One, OneSize } from "./letters/one";
import { Two, TwoSize } from "./letters/two";
import { Zero, ZeroSize } from "./letters/zero";

const noiseX = new SimplexNoise("seedx2");
const noiseY = new SimplexNoise("seedY2");

const items: {
  size: readonly [number, number];
  Component: React.FC<SVGProps<SVGElement>>;
}[] = [
  {
    size: TwoSize,
    Component: Two,
  },
  {
    size: ZeroSize,
    Component: Zero,
  },

  {
    size: OneSize,
    Component: One,
  },
];

export const Decoration: React.FC<{
  start: readonly [number, number];
  end: readonly [number, number];
  width: number;
  height: number;
}> = ({ width, height, start, end }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const scale = Math.sqrt(width * height) / 1000;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const pointSize = Math.sqrt(width * height) * 0.15;

    const ctx = ref.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    for (let i = -0.8; i < 1.8; i += 0.005) {
      const pointX =
        interpolate(i, [0, 1], [start[0], end[0]]) +
        noiseX.noise2D(0, i / 2) * 0.1;
      const pointY =
        interpolate(i, [0, 1], [start[1], end[1]]) + noiseY.noise2D(0, i) * 0.1;

      ctx.fillStyle = LINE_COLOR;
      ctx.fillRect(pointX * width, pointY * height, pointSize, pointSize);
    }
  }, [end, height, start, width]);
  return (
    <AbsoluteFill
      style={{
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={ref}
        width={width}
        height={height}
        style={{
          width,
          height,
          position: "absolute",
        }}
      ></canvas>
      {items.map(({ Component, size }, i) => {
        const pointX =
          interpolate(i, [-0.2, items.length - 1 + 0.2], [start[0], end[0]]) +
          noiseX.noise2D(0, i / items.length) * 0.1;
        const pointY =
          interpolate(i, [-0.2, items.length - 1 + 0.2], [start[1], end[1]]) +
          noiseY.noise2D(0, i / items.length) * 0.1;

        return (
          <AbsoluteFill
            key={i}
            style={{
              left: pointX * width - 100,
              top: pointY * height - 100,
              transformOrigin: "center center",
            }}
          >
            <AbsoluteFill>
              <Component
                style={{
                  width: 150,
                  transform: `rotate(${
                    random("rotate" + i) * Math.PI
                  }rad) scale(${scale})`,
                }}
                fill={BACKGROUND_COLOR}
              ></Component>
            </AbsoluteFill>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
