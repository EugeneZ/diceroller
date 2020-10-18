import React from "react";
import { NamedDiceSet, NamedQuest } from "./types";

export type AppState = { diceSets: Array<NamedDiceSet>, quests: Array<NamedQuest> };

export const initialState: AppState = { diceSets: [], quests: []};

const localStorageKey = "appState";
const maybeSavedState = window.localStorage.getItem(localStorageKey);
const savedState = maybeSavedState ? (JSON.parse(maybeSavedState) as AppState) : initialState;



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
