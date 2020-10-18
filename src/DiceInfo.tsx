import React from "react";
import { PlayerDice, PlayerDie } from "./types";
import { getOddsOfSuccess } from "./lib";
import playerDiceToDiceSet from "./playerDiceToDiceSet";
import Skull from "./icons/Skull";
import Shield from "./icons/Shield";
import Bolt from "./icons/Bolt";
import { Die } from "./Die";

interface Props {
  dice: PlayerDice;
}

export default function DiceInfo({ dice }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const diceSet = React.useMemo(() => playerDiceToDiceSet(dice), [dice]);
  const stats = React.useMemo(
    () => ({
      skulls: 
        [1, 2, 3, 4, 5].map((i) => getOddsOfSuccess(diceSet, { skull: i }, 1) || ['?']),
      
      shields: 
        [1, 2, 3, 4, 5].map((i) => getOddsOfSuccess(diceSet, { shield: i }, 1) || ['?']),

      bolts: 
        [1, 2, 3, 4, 5].map((i) => getOddsOfSuccess(diceSet, { bolt: i }, 1) || ['?']),
    }),
    [diceSet]
  );

  const getMaximizeDice = (result: [number, string[] | null][])=>{
    for (let i = result.length - 1; i >= 0; i--) {
      const test = result[i][1];
      if (test) {
        return test;
      }
    }
  };
  const maximizeSkullDice = React.useMemo(()=>getMaximizeDice(stats.skulls),[stats])
  const maximizeShieldDice = React.useMemo(()=>getMaximizeDice(stats.shields),[stats])
  const maximizeBoltDice   = React.useMemo(()=>getMaximizeDice(stats.bolts),[stats])

  console.log(stats)
  return (
    <span
      role="img"
      aria-label="Stats"
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      ❓
      {open && (
        <table style={{ position: "absolute", backgroundColor: 'white', border: '1px solid black', left: 0, zIndex: 5 }}>
          <thead>
            <tr>
              <th> </th>
              <th>1+</th>
              <th>2+</th>
              <th>3+</th>
              <th>4+</th>
              <th>5+</th>
              <th>Maximize</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Skull />
              </td>
              <td>{stats.skulls[0][0]}</td>
              <td>{stats.skulls[1][0]}</td>
              <td>{stats.skulls[2][0]}</td>
              <td>{stats.skulls[3][0]}</td>
              <td>{stats.skulls[4][0]}</td>
              <td><div style={{ display: 'flex' }}>{maximizeSkullDice?.map((die) => <Die tiny die={die as PlayerDie}/>)}</div></td>
            </tr>
            <tr>
              <td>
                <Shield />
              </td>
              <td>{stats.shields[0][0]}</td>
              <td>{stats.shields[1][0]}</td>
              <td>{stats.shields[2][0]}</td>
              <td>{stats.shields[3][0]}</td>
              <td>{stats.shields[4][0]}</td>
              <td><div style={{ display: 'flex' }}>{maximizeShieldDice?.map((die) => <Die tiny die={die as PlayerDie}/>)}</div></td>
            </tr>
            <tr>
              <td>
                <Bolt />
              </td>
              <td>{stats.bolts[0][0]}</td>
              <td>{stats.bolts[1][0]}</td>
              <td>{stats.bolts[2][0]}</td>
              <td>{stats.bolts[3][0]}</td>
              <td>{stats.bolts[4][0]}</td>
              <td><div style={{ display: 'flex' }}>{maximizeBoltDice?.map((die) => <Die tiny die={die as PlayerDie}/>)}</div></td>
            </tr>
          </tbody>
        </table>
      )}
    </span>
  );
}
