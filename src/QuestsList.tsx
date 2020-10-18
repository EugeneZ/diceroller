import React from "react";
import Box from "./Box";
import Quest from "./Quest";
import { NamedDiceSet, NamedQuest } from "./types";

interface Props {
  quests: Array<NamedQuest>;
  diceSets: Array<NamedDiceSet>;
  onChange: (quest: NamedQuest) => void;
}

export default function QuestsList({ quests, diceSets, onChange }: Props) {
  return (
    <Box title="Quests">
      <div style={{ display: "flex" }}>
        {quests.map((quest) => (
          <Quest quest={quest} diceSets={diceSets} onChange={onChange} />
        ))}
      </div>
    </Box>
  );
}
