import React from "react";
import Box from "./Box";
import DiceChooser from "./DiceChooser";
import Bolt from "./icons/Bolt";
import Shield from "./icons/Shield";
import Skull from "./icons/Skull";
import Result from "./Result";
import { NamedDiceSet, NamedQuest, PlayerDie } from "./types";

interface Props {
  quest: NamedQuest;
  diceSets: Array<NamedDiceSet>;
  onChange: (quest: NamedQuest) => void;
}

export default function Quest({ quest, diceSets, onChange }: Props) {
  const [optionalDie, setOptionalDie] = React.useState<PlayerDie | null>(null);
  return (
    <Box title={quest.name}>
      <div style={{ display: "flex" }}>
        <div>
          <Skull />
          {quest.skulls}
        </div>
        <div>
          <Shield />
          {quest.shields}
        </div>
        <div>
          <Bolt />
          {quest.bolts}
        </div>
      </div>
      <div>
        {diceSets.map((diceSet) => (
          <Result diceSet={diceSet} quest={quest} optionalDie={optionalDie}/>
        ))}
      </div>
      <div>
        <DiceChooser onChoose={die => setOptionalDie(die)}>Set Optional Die</DiceChooser>
      </div>
    </Box>
  );
}
