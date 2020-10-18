import React from "react";
import { PlayerDie } from "./types";

interface Props {
  die: PlayerDie;
  tiny?: boolean;
}

export function Die({ die, tiny }: Props) {
  return (
    <div
      style={{
        margin: 2,
        width: tiny ? "0.5em" : "5em",
        height: tiny ? "0.5em" : "5em",
        border: "2px solid black",
        borderRadius: 8,
        backgroundColor: die,
      }}
    />
  );
}
