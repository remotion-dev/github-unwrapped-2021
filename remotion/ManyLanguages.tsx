import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "./icons/C";
import { Dart } from "./icons/Dart";
import { Elixir } from "./icons/Elixir";
import { Erlang } from "./icons/Erlang";
import { Flutter } from "./icons/Flutter";
import { Go } from "./icons/Go";
import { Haskell } from "./icons/Haskell";
import { Javascript } from "./icons/Javascript";
import { Php } from "./icons/Php";
import { Python } from "./icons/Python";
import { Ruby } from "./icons/Ruby";
import { Rust } from "./icons/Rust";
import { Scala } from "./icons/Scala";
import { Swift } from "./icons/Swift";
import { Typescript } from "./icons/Typescript";
import { Zig } from "./icons/Zig";

const column: React.CSSProperties = {};

const row: React.CSSProperties = {
  flexDirection: "row",
  display: "flex",
  flex: 1,
};

const item: React.CSSProperties = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  position: "relative",
};

export const ManyLanguages: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
      }}
    >
      <div style={row}>
        <div style={item}>
          <Ruby></Ruby>
        </div>
        <div style={item}>
          <Rust></Rust>
        </div>
        <div style={item}>
          <Typescript></Typescript>
        </div>
        <div style={item}>
          <C></C>
        </div>
      </div>
      <div style={row}>
        <div style={item}>
          <Dart></Dart>
        </div>
        <div style={item}>
          <Elixir></Elixir>
        </div>
        <div style={item}>
          <Erlang></Erlang>
        </div>
        <div style={item}>
          <Flutter></Flutter>
        </div>
      </div>
      <div style={row}>
        <div style={item}>
          <Go></Go>
        </div>
        <div style={item}>
          <Javascript></Javascript>
        </div>
        <div style={item}>
          <Scala></Scala>
        </div>
        <div style={item}>
          <Php></Php>
        </div>
      </div>
      <div style={row}>
        <div style={item}>
          <Python></Python>
        </div>
        <div style={item}>
          <Swift></Swift>
        </div>
        <div style={item}>
          <Zig></Zig>
        </div>
        <div style={item}>
          <Haskell></Haskell>
        </div>
      </div>
    </AbsoluteFill>
  );
};
