import { parseFileAsArray } from "../utils/file-parser.ts";

const dataFromFile = await parseFileAsArray(
  `${import.meta.url}`,
  "sweep/sweep.data",
);
const data = dataFromFile.map(Number);
