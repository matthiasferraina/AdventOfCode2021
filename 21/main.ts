export type Player = {
  score: number;
  position: number;
};

export type Dice = {
  numberOfRolls: number;
  currentValue: number;
};

export const computeFinalScore = (
  player1: Player,
  player2: Player,
  dice: Dice
) => {
  return Math.min(player1.score, player2.score) * dice.numberOfRolls;
};

export const rollDice = (dice: Dice): Dice => {
  const { currentValue, numberOfRolls } = dice;

  return {
    numberOfRolls: numberOfRolls + 1,
    currentValue: currentValue === 100 ? 1 : currentValue + 1,
  };
};

export const getPlayerPosition = (
  position: number,
  sumOfRolls: number
): number => {
  const result = (position + sumOfRolls) % 10;
  return result === 0 ? 10 : result;
};

export const computePlayerScore = (score: number, position: number): number => {
  return score + position;
};

export const isGameFinished = (player1: Player, player2: Player): boolean => {
  return (Math.max(player1.score, player2.score) >= 1000);
};

export const game = (player1: Player, player2: Player, dice: Dice): number => {
  do {
    [player1, player2].forEach((player: Player) => {
      if (isGameFinished(player1, player2)) {
        return;
      }
      let sumOfRolls = dice.currentValue;
      dice = rollDice(dice);
      sumOfRolls += dice.currentValue;
      dice = rollDice(dice);
      sumOfRolls += dice.currentValue;
      dice = rollDice(dice);

      player.position = getPlayerPosition(player.position, sumOfRolls);
      player.score = computePlayerScore(player.score, player.position);

    });
  } while (!isGameFinished(player1, player2));
  return computeFinalScore(player1, player2, dice);
};