import React from "react";
import DiceChooser from "./DiceChooser";
import { Die } from "./Die";
import { PlayerDice } from "./types";

interface Props {
  dice: PlayerDice;
  onChange: (dice: PlayerDice) => void;
}

export default function DiceConfigurator({ dice, onChange }: Props) {
  return (
    <div style={{ display: "flex" }}>
      {dice.map((orDice, i) => (
        <div>
          {orDice.map((die, j) => (
            <div
              onClick={() =>
                onChange(
                  dice
                    .map((el, k) => {
                      if (k !== i) return el;
                      const newEl = el.slice();
                      newEl.splice(j, 1);
                      return newEl;
                    })
                    .filter((el) => el.length)
                )
              }
            >
              <Die die={die} />
            </div>
          ))}
          <DiceChooser
            onChoose={(die) =>
              onChange(dice.map((el, j) => (i === j ? [...el, die] : el)))
            }
          >
            or...
          </DiceChooser>
        </div>
      ))}
      <DiceChooser onChoose={(die) => onChange([...dice, [die]])}>
        and...
      </DiceChooser>
    </div>
  );
}
