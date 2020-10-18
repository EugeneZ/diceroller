export type PlayerDie =
  | "white"
  | "orange"
  | "blue"
  | "red"
  | "purple"
  | "black";

export type PlayerDice = Array<Array<PlayerDie>>;

export interface NamedDiceSet {
  id: number;
  name: string;
  dice: PlayerDice;
}

export interface NamedQuest {
  id: number;
  name: string;
  skulls: number | null;
  shields: number | null;
  bolts: number | null;
  minSuccesses: number;
}
