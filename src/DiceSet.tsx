import React from "react";
import Box from "./Box";
import DiceConfigurator from "./DiceConfigurator";
import DiceInfo from "./DiceInfo";
import { NamedDiceSet } from "./types";

interface Props {
  diceSet: NamedDiceSet;
  onChange: (newDiceSet: NamedDiceSet)=>void;
}

export default function DiceSet({ diceSet, onChange }: Props) {
  return (
    <Box title={diceSet.name}>
      <DiceInfo dice={diceSet.dice}/>
      <DiceConfigurator dice={diceSet.dice} onChange={(dice)=> onChange({ ...diceSet, dice })}/>
    </Box>
  );
}
