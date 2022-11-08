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
    completeScore: 3,
  },
  "]": {
    score: 57,
    completeScore: 2,
  },
  ">": {
    score: 25137,
    completeScore: 4,
  },
  ")": {
    score: 3,
    completeScore: 1,
  },
};

export const filterCorruptedLines = (lines: string[]): string[] => {
  return lines.filter((line: string) => {
    const corruptedLine = findCorruptedChar(line);
    return !corruptedLine;
  });
};

export const findClosingSequence = (line: string): string => {
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
      index = -1;
    }
  }
  return charsToCheck
    .map((char: string): string => charactersMap[char].sibling)
    .reverse()
    .join("");
};

export const computeCompletionSequenceScore = (line: string): number => {
  return line
    .split("")
    .map((char: string): number => charactersScoreMap[char].completeScore)
    .reduce((acc: number, curr: number): number => {
      return acc * 5 + curr;
    }, 0);
};

export const findMiddleNumber = (array: number[]): number => {
  const sortedArray = array.sort((a, b) => a - b);
  return sortedArray[Math.floor(sortedArray.length / 2)];
};
