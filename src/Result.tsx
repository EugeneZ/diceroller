import React from "react";
import Box from "./Box";
import { Die } from "./Die";
import { getOddsOfSuccess } from "./lib";
import playerDiceToDiceSet from "./playerDiceToDiceSet";
import { NamedDiceSet, NamedQuest, PlayerDie } from "./types";

interface Props {
  quest: NamedQuest;
  diceSet: NamedDiceSet;
}

export default function Result({ quest, diceSet }: Props) {
  const libDiceSet = React.useMemo(() => playerDiceToDiceSet(diceSet.dice), [
    diceSet,
  ]);
  const stats = React.useMemo(
    () =>
      getOddsOfSuccess(
        libDiceSet,
        {
          skull: quest.skulls || undefined,
          shield: quest.shields || undefined,
          bolt: quest.bolts || undefined,
        },
        quest.minSuccesses
      ) || ["?"],
    [libDiceSet, quest]
  );

  return (
    <Box title={diceSet.name}>
      <div style={{ display: "flex" }}>
        <span>{stats[0]}</span>
        {stats[1]?.map((die) => (
          <Die tiny die={die as PlayerDie} />
        ))}
      </div>
    </Box>
  );
}
