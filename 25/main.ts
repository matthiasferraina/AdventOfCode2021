import { parseFileAsArray } from "../utils/file-parser.ts";

export function moveCucumbersInOneLine(
  line: string[],
  cucumberType: string
): string[] {
  const newLine: string[] = [];
  const lineLength = line.length;
  for (let i = 0; i < lineLength; i++) {
    const element = line[i];
    if (
      i === lineLength - 1 &&
      line[0] === "." &&
      line[lineLength - 1] === cucumberType
    ) {
      newLine.splice(0, 1, cucumberType);
      newLine.push(".");
      break;
    }

    if (element === cucumberType && line[i + 1] === ".") {
      newLine.push(".");
      newLine.push(cucumberType);
      i++;
    } else {
      newLine.push(element);
    }
  }
  return newLine;
}

export const moveEastCucumbers = (herd: string[][]): string[][] =>
  herd.map((line: string[]) => moveCucumbersInOneLine(line, ">"));

export const moveSouthCucumbers = (herd: string[][]): string[][] => {
  const transposedHerd = transposeArray(herd);
  const transposedHerdMovedSouth = transposedHerd.map((line: string[]) =>
    moveCucumbersInOneLine(line, "v")
  );
  return transposeArray(transposedHerdMovedSouth);
};

export const transposeArray = <T>(array: T[][]): T[][] => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
};

export const getCucumbers = async (): Promise<string[][]> => {
  const dataFromFile = (
    await parseFileAsArray(`${import.meta.url}`, "main.data")
  ).map((el) => el.split(""));
  return dataFromFile;
};

export const main = async (): Promise<number> => {
  const initialCucumbersFishs = await getCucumbers();
  let iterations = 1;
  let fishs: string[][] = initialCucumbersFishs;
  let finished = false;
  while (!finished) {
    const movedEastCucumbers = moveEastCucumbers(fishs);
    const movedSouthCucumbers = moveSouthCucumbers(movedEastCucumbers);
    if (cucumbersHerdAreTheSame(fishs, movedSouthCucumbers)) {
      finished = true;
    } else {
      fishs = movedSouthCucumbers;
      iterations++;
    }
  }
  return iterations;
};

export const cucumbersHerdAreTheSame = (
  before: string[][],
  after: string[][]
): boolean => {
  const beforeStringified = before.map((el) => el.join(""));
  const afterStringified = after.map((el) => el.join(""));
  for (let i = 0; i < beforeStringified.length; i++) {
    const beforeString = beforeStringified[i];
    const afterString = afterStringified[i];
    if (afterString !== beforeString) return false;
  }
  return true;
};
