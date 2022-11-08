import { parseFileAsArray } from "../utils/file-parser.ts";
import { findCorruptedChar, getCorruptedCharacterScore } from "./lib.ts";

export function main(data: string[]): number {
  return data
    .map(findCorruptedChar)
    .map(getCorruptedCharacterScore)
    .reduce((acc, curr) => acc + curr, 0);
}

//get data from file
const puzzleData = await parseFileAsArray(`${import.meta.url}`, "./puzzle1.data.txt");
console.log(main(puzzleData));
