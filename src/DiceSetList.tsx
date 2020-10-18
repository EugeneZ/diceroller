import React from "react";
import Box from "./Box";
import DiceSet from "./DiceSet";
import { NamedDiceSet } from "./types";

interface Props {
  diceSetList: Array<NamedDiceSet>;
  onChange: (diceSet: NamedDiceSet) => void;
}

export default function DiceSetList({ diceSetList, onChange }: Props) {
  return (
    <Box title="Dice Sets">
      <div style={{ display: "flex" }}>
        {diceSetList.map((diceSet) => (
          <DiceSet diceSet={diceSet} onChange={onChange} />
        ))}
      </div>
    </Box>
  );
}
