import React from "react";
import { Die } from "./Die";
import { PlayerDie } from "./types";

interface Props {
  children: React.ReactNode;
  onChoose: (die: PlayerDie) => void;
}

const allDice: Array<PlayerDie> = [
  "white",
  "orange",
  "red",
  "blue",
  "purple",
  "black",
];

export default function DiceChooser({ children, onChoose }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div style={{ position: "relative" }}>
      {open ? (
        <div style={{ position: "absolute" }}>
          {allDice.map((die) => (
            <button onClick={() => {onChoose(die); setOpen(false)}}>
              <Die die={die} />
            </button>
          ))}
        </div>
      ) : (
        <button onClick={() => setOpen(true)}>{children}</button>
      )}
    </div>
  );
}
