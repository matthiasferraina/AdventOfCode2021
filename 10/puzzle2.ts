import { parseFileAsArray } from "../utils/file-parser.ts";
import {
  computeCompletionSequenceScore,
  filterCorruptedLines,
  findClosingSequence,
  findMiddleNumber,
} from "./lib.ts";

export function main(data: string[]): number {
  const completionScores = filterCorruptedLines(data)
    .map(findClosingSequence)
    .map(computeCompletionSequenceScore);

  return findMiddleNumber(completionScores);
}

//get data from file
const puzzleData = await parseFileAsArray(
  `${import.meta.url}`,
  "./puzzle1.data.txt"
);
console.log(main(puzzleData));
