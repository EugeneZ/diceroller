export type Face = "skull" | "shield" | "bolt";
export type Faces = Array<Face>;

export interface Die {
  name: string;
  faces: Array<Faces>;
}

export type Dice = Array<Die>;
export type DiceSet = Array<Dice>;

export type Result = {
  [key in Face]: number;
};

export type Goal = Partial<Result>;

export const white: Die = {
  name: "white",
  faces: [["skull", "shield"], ["skull"], ["shield"], [], [], []],
};
export const orange: Die = {
  name: "orange",
  faces: [["skull"], ["skull"], ["skull"], ["skull"], [], []],
};
export const red: Die = {
  name: "red",
  faces: [["skull", "skull"], ["skull", "bolt"], ["skull"], ["skull"], [], []],
};
export const blue: Die = {
  name: "blue",
  faces: [["shield"], ["shield"], ["skull"], ["skull"], ["skull"], []],
};
export const purple: Die = {
  name: "purple",
  faces: [
    ["bolt", "bolt"],
    ["skull", "bolt"],
    ["skull"],
    ["skull"],
    ["skull"],
    [],
  ],
};
export const black: Die = {
  name: "black",
  faces: [
    ["skull", "skull", "skull"],
    ["skull", "skull"],
    ["skull"],
    ["skull"],
    ["skull"],
    ["bolt"],
  ],
};

const faces: Faces = ["skull", "shield", "bolt"];

const choice = (die: Die) =>
  die.faces[Math.floor(Math.random() * die.faces.length)];

const print = console.log;

const rollADie = (die: Die) => choice(die);
const rollDice = (dice: Dice) => {
  const result: Result = { skull: 0, shield: 0, bolt: 0 };
  for (const die of dice) {
    const symbols = rollADie(die);
    for (const symbol of symbols) {
      result[symbol] = result[symbol] + 1;
    }
  }
  return result;
};

const checkSuccess = (result: Result, goal: Goal) => {
  let successes = 0;
  for (const symbol of faces) {
    if (result[symbol] >= (goal[symbol] || Number.MAX_SAFE_INTEGER)) {
      successes = successes + 1;
    }
  }
  return successes;
};

const quest = (
  dice: Dice,
  goal: Goal,
  minSuccesses: number,
  verbose: boolean = false
) => {
  const result = rollDice(dice);
  const successes = checkSuccess(result, goal);
  if (verbose) {
    print(result, successes);
  }
  return successes >= minSuccesses;
};

const questSuccessProbability = (
  dice: Dice,
  goal: Goal,
  minSuccesses: number,
  trials: number = 10000
) => {
  let successes = 0;
  for (let i = 0; i < trials; i++) {
    if (quest(dice, goal, minSuccesses, false)) {
      successes = successes + 1;
    }
  }
  return (100 * successes) / trials;
};

const averageRoll = (dice: Dice, trials: number = 100000) => {
  const result = { skull: 0, shield: 0, bolt: 0 };

  for (let i = 0; i < trials; i++) {
    const rollResult = rollDice(dice);
    for (const symbol of faces) {
      result[symbol] = result[symbol] + rollResult[symbol];
    }
  }

  for (const symbol of faces) {
    result[symbol] = result[symbol] / trials;
  }

  return result;
};

export const combine = (startingDiceSet: DiceSet, ...additionalDice: Dice) => {
  let diceArrays = [];
  for (const additionalDie of additionalDice) {
    if (startingDiceSet.length) {
      for (const startingDice of startingDiceSet) {
        diceArrays.push([...startingDice, additionalDie]);
      }
    } else {
      diceArrays.push([additionalDie]);
    }
  }
  return diceArrays;
};

export const getOddsOfSuccess = (
  diceSet: DiceSet,
  goal: Goal,
  minSuccesses: number
) => {
  let maxProb: [number, Array<string> | null] = [0, null];
  for (const dice of diceSet) {
    const prob = questSuccessProbability(dice, goal, minSuccesses);
    if (prob > maxProb[0]) {
      maxProb[0] = prob;
      maxProb[1] = dice.map((die) => die.name);
    }
  }
  return maxProb;
};
