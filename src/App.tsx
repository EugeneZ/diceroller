import React from "react";
import DiceSetList from "./DiceSetList";
import getNewId from "./getNewId";
import QuestsList from "./QuestsList";
import sortById from "./sortById";
import useAppState, { AppState, initialState } from "./useAppState";

function App() {
  const [appState, setAppState] = useAppState();

  return (
    <div className="App">
      <button
        onClick={() => {
          const name = prompt("Dice Set Name?");
          if (name) {
            setAppState((previousAppState: AppState) => ({
              ...previousAppState,
              diceSets: [
                ...previousAppState.diceSets,
                { id: getNewId(), name, dice: [] },
              ].sort(sortById),
            }));
          }
        }}
      >
        Add Dice Set
      </button>
      <button
        onClick={() => {
          const name = prompt("Quest Name?");
          if (name === null) {
            return;
          }
          const skullsString = prompt("Skulls?");
          if (skullsString === null) {
            return;
          }
          const shieldsString = prompt("Shields?");
          if (shieldsString === null) {
            return;
          }
          const boltsString = prompt("Bolts?");
          if (boltsString === null) {
            return;
          }
          const minSuccessesString = prompt("Number of successes required?");
          if (minSuccessesString === null) {
            return;
          }

          const skulls = parseInt(skullsString, 10) || null;
          const shields = parseInt(shieldsString, 10) || null;
          const bolts = parseInt(boltsString, 10) || null;
          const minSuccesses = parseInt(minSuccessesString, 10) || null;

          if (!minSuccesses) {
            return;
          }

          setAppState((previousAppState: AppState) => ({
            ...previousAppState,
            quests: [
              ...previousAppState.quests,
              { id: getNewId(), name, skulls, shields, bolts, minSuccesses },
            ].sort(sortById),
          }));
        }}
      >
        Add Quest
      </button>
      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to delete everything?")) {
            setAppState(initialState);
          }
        }}
      >
        Clear All
      </button>
      <DiceSetList
        diceSetList={appState.diceSets}
        onChange={(newDiceSet) =>
          setAppState((previousAppState) => ({
            ...previousAppState,
            diceSets: previousAppState.diceSets
              .filter((set) => set.name !== newDiceSet.name)
              .concat(newDiceSet)
              .sort(sortById),
          }))
        }
      />
      <QuestsList
        quests={appState.quests}
        diceSets={appState.diceSets}
        onChange={(newQuest) =>
          setAppState((previousAppState) => ({
            ...previousAppState,
            quests: previousAppState.quests
              .filter((set) => set.name !== newQuest.name)
              .concat(newQuest)
              .sort(sortById),
          }))
        }
      />
    </div>
  );
}

export default App;
