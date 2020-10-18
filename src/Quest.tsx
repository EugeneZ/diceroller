import React from "react";
import Box from "./Box";
import Bolt from "./icons/Bolt";
import Shield from "./icons/Shield";
import Skull from "./icons/Skull";
import Result from "./Result";
import { NamedDiceSet, NamedQuest } from "./types";

interface Props {
  quest: NamedQuest;
  diceSets: Array<NamedDiceSet>;
  onChange: (quest: NamedQuest) => void;
}

export default function Quest({ quest, diceSets, onChange }: Props) {
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
          <Result diceSet={diceSet} quest={quest} />
        ))}
      </div>
    </Box>
  );
}
