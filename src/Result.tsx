import React from "react";
import Box from "./Box";
import { Die } from "./Die";
import { getOddsOfSuccess } from "./lib";
import playerDiceToDiceSet from "./playerDiceToDiceSet";
import { NamedDiceSet, NamedQuest, PlayerDie } from "./types";

interface Props {
  quest: NamedQuest;
  diceSet: NamedDiceSet;
  optionalDie: PlayerDie | null;
}

export default function Result({ quest, diceSet, optionalDie }: Props) {
  const libDiceSet = React.useMemo(() => playerDiceToDiceSet(diceSet.dice), [
    diceSet,
  ]);
  const libDiceSetWithOptionalDie = React.useMemo(
    () =>
      optionalDie
        ? playerDiceToDiceSet([...diceSet.dice, [optionalDie]])
        : null,
    [optionalDie, diceSet]
  );

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

  const statsWithOptionalDie = React.useMemo(
    () =>
      libDiceSetWithOptionalDie
        ? getOddsOfSuccess(
            libDiceSetWithOptionalDie,
            {
              skull: quest.skulls || undefined,
              shield: quest.shields || undefined,
              bolt: quest.bolts || undefined,
            },
            quest.minSuccesses
          ) || ["?"]
        : null,
    [libDiceSetWithOptionalDie, quest]
  );

  return (
    <Box title={diceSet.name}>
      <div style={{ display: "flex" }}>
        <span>{stats[0]}</span>
        {stats[1]?.map((die) => (
          <Die tiny die={die as PlayerDie} />
        ))}
        {statsWithOptionalDie && typeof statsWithOptionalDie[0] === "number" && (
          <>
            (+{(statsWithOptionalDie[0] - stats[0]).toFixed(2)} ={" "}
            {statsWithOptionalDie[0]}
            {statsWithOptionalDie[1]?.map((die) => (
              <Die tiny die={die as PlayerDie} />
            ))}
            )
          </>
        )}
      </div>
    </Box>
  );
}
