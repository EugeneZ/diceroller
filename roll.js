
const white = { name: 'white', faces: [["skull", "shield"], ["skull"], ["shield"], [], [], []] }
const orange = { name: 'orange', faces: [["skull"], ["skull"], ["skull"], ["skull"], [], []] }
const red = { name: 'red', faces: [["skull", "skull"], ["skull", "bolt"], ["skull"], ["skull"], [], []] }
const blue = { name: 'blue', faces: [["shield"], ["shield"], ["skull"], ["skull"], ["skull"], []] }
const purple = { name: 'purple', faces: [["bolt", "bolt"], ["skull", "bolt"], ["skull"], ["skull"], ["skull"], []] }
const black = { name: 'black', faces: [["skull", "skull", "skull"], ["skull", "skull"], ["skull"], ["skull"], ["skull"], ["bolt"]] }

const faces = ['skull', 'shield', 'bolt'];

const choice = (die) => die.faces[Math.floor(Math.random() * die.faces.length)]

const print = console.log;

const rollADie = (die) => choice(die)
const rollDice = (dice) => {
  const result = {"skull": 0, "shield": 0, "bolt": 0}
    for (const die of dice) {
        const symbols = rollADie(die)
        for (const symbol of symbols) {
            result[symbol] = result[symbol] + 1
        }
    }
    return result
}

const checkSuccess = (result, goal)=>{
    let successes = 0
    for (const symbol of faces) {
        if (result[symbol] >= goal[symbol]) {
            successes = successes + 1
        }
    }
    return successes
}

const quest = (dice, goal, minSuccesses, verbose=false)=>{
    const result = rollDice(dice)
    const successes = checkSuccess(result, goal)
    if (verbose) {
        print(result, successes)
    }
    return successes >= minSuccesses
}

const questSuccessProbability = (dice, goal, minSuccesses, trials=10000) => {
    let successes = 0
    for (let i = 0; i < trials; i++) {
        if (quest(dice, goal, minSuccesses, false)) {
            successes = successes + 1
        }
    }
    return 100*successes/trials
}

const averageRoll = (dice, trials=100000)=>{
    const result = {"skull": 0, "shield": 0, "bolt": 0}

    for (let i = 0; i < trials; i++) {
        const rollResult = rollDice(dice)
        for (const symbol of faces) {
            result[symbol] = result[symbol] + rollResult[symbol]
        }
    }

    for (const symbol of faces) {
        result[symbol] = result[symbol]/trials
    }
    
    return result
}

const combine = (startingDiceSet, ...additionalDice) => {
  let diceArrays = [];
  for (const additionalDie of additionalDice) {
    for (const startingDice of startingDiceSet) {
      diceArrays.push([...startingDice, additionalDie]);
    }
  }
  return diceArrays;
}

// below I calculate our chances for success for the quests in this game

const players = {
  "ronja": combine([[red, red, blue, blue]], white, orange),
  "ronjaPlusQuest": combine([[red, red, blue, blue, purple]], white, orange),
  "yanny": combine(combine([[red, blue, purple, purple]], white, orange), white, blue, red, purple, orange, black),
  "yannyPlusQuest": combine(combine([[red, blue, purple, purple, purple]], white, orange), white, blue, red, purple, orange, black),
  "fahyanor": combine(combine([[red, purple, purple, blue]], white, orange), white, orange),
  "fahyanorPlusQuest": combine(combine([[red, purple, purple]], white, orange), white, orange),
  "khaal": [[red, red, red, purple, blue, blue]],
  "khaalPlusQuest": [[red, red, red, purple, blue, blue, orange]],
}

const doQuest = (name, questRolls, minSuccesses) => {
    for (const player of Object.keys(players)) {
        const diceSet = players[player]
        let maxProb = [0, null]
        for (const dice of diceSet) {
            const prob = questSuccessProbability(dice, questRolls, minSuccesses)
            if (prob > maxProb[0]) {
                maxProb[0] = prob
                maxProb[1] = dice.map(die => die.name)
            }
        }
        print(name, player, maxProb)
    }
};

doQuest('forest spirit', {'skull': 3, "shield": 1, 'bolt': 1}, 1);
doQuest('druid sacrifice', {'skull': 3, "shield": 1, 'bolt': 2}, 2);
doQuest('corrupted duir', {'skull': 4, "shield": 1, 'bolt': 3}, 1);
doQuest('three bolt', {'bolt': 3}, 1);
