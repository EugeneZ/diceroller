import React from "react";
import { NamedDiceSet, NamedQuest } from "./types";

export type AppState = {
  diceSets: Array<NamedDiceSet>;
  quests: Array<NamedQuest>;
};

export const initialState: AppState = { diceSets: [], quests: [] };

const localStorageKey = "appState";
const maybeSavedState = window.localStorage.getItem(localStorageKey);
let savedState = maybeSavedState
  ? (JSON.parse(maybeSavedState) as AppState)
  : initialState;

function isValidState(state: any): state is AppState {
  if (typeof state !== "object" || !state) {
    return false;
  }

  if (!Array.isArray(state.diceSets) || !Array.isArray(state.quests)) {
    return false;
  }

  for (const diceSet of state.diceSets) {
    if (typeof diceSet !== "object" || !diceSet) {
      return false;
    }

    if (
      typeof diceSet.id !== "number" ||
      typeof diceSet.name !== "string" ||
      !Array.isArray(diceSet.dice)
    ) {
      return false;
    }

    for (const orDice of diceSet.dice) {
      if (!Array.isArray(orDice)) {
        return false;
      }
      for (const die of orDice) {
        if (typeof die !== "string") {
          return false;
        }
        if (
          !(
            die === "white" ||
            die === "orange" ||
            die === "red" ||
            die === "purple" ||
            die === "blue" ||
            die === "black"
          )
        ) {
          return false;
        }
      }
    }
  }

  for (const quest of state.quests) {
    if (typeof quest !== "object" || !quest) {
      return false;
    }

    if (
      typeof quest.name !== "string" ||
      typeof quest.id !== "number" ||
      typeof quest.minSuccesses !== "number"
    ) {
      return false;
    }

    if (typeof quest.skulls !== "number" && quest.skulls !== null) {
      return false;
    }

    if (typeof quest.shields !== "number" && quest.shields !== null) {
      return false;
    }

    if (typeof quest.bolts !== "number" && quest.bolts !== null) {
      return false;
    }
  }

  return true;
}

if (!isValidState(savedState)) {
  savedState = initialState;
  window.localStorage.removeItem(localStorageKey);
}

export default function useAppState(): [
  AppState,
  React.Dispatch<React.SetStateAction<AppState>>
] {
  const [diceSets, setDiceSets] = React.useState<AppState>(savedState);
  React.useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(diceSets));
  }, [diceSets]);

  return [diceSets, setDiceSets];
}
