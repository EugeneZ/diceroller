import {
  combine,
  DiceSet,
  white,
  orange,
  red,
  blue,
  purple,
  black,
} from "./lib";
import { PlayerDice } from "./types";

export default function playerDiceToDiceSet(dice: PlayerDice): DiceSet {
  return dice.reduce<DiceSet>((diceSet, orDie) => {
    const orDieAsDice = orDie.map((die) =>
      die === "white"
        ? white
        : die === "orange"
        ? orange
        : die === "red"
        ? red
        : die === "blue"
        ? blue
        : die === "purple"
        ? purple
        : black
    );
    return combine(diceSet, ...orDieAsDice);
  }, []);
}
