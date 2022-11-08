export const isOpeningCharacter = (char: string): boolean =>
  ["[", "{", "<", "("].some((el: string) => el === char);

export const isClosingCharacter = (char: string): boolean =>
  ["]", "}", ">", ")"].some((el: string) => el === char);

export const findCorruptedChar = (line: string): string | null => {
  const charsToCheck = line.split("");

  for (let index = 0; index < charsToCheck.length; index++) {
    const currentElement = charsToCheck[index];
    const nextElement = charsToCheck[index + 1];

    if (
      isOpeningCharacter(currentElement) &&
      isClosingCharacter(nextElement) &&
      nextElement === charactersMap[currentElement].sibling
    ) {
      charsToCheck.splice(index, 2);
      index = 0;
    }

    if (
      isOpeningCharacter(currentElement) &&
      isClosingCharacter(nextElement) &&
      nextElement !== charactersMap[currentElement].sibling
    ) {
      return nextElement;
    }
  }

  return null;
};

export const getCorruptedCharacterScore = (char: string | null): number => {
  return char ? charactersScoreMap[char].score : 0;
};

const charactersMap: Record<string, Record<string, string>> = {
  "{": {
    sibling: "}",
    score: "1197",
  },
  "(": {
    sibling: ")",
  },
  "<": {
    sibling: ">",
  },
  "[": {
    sibling: "]",
  },
};

const charactersScoreMap: Record<string, Record<string, number>> = {
  "}": {
    score: 1197,
  },
  "]": {
    score: 57,
  },
  ">": {
    score: 25137,
  },
  ")": {
    score: 3,
  },
};
