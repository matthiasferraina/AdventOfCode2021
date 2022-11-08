import { assertEquals } from "../../../deps-dev.ts";
import { parseFileAsArray } from "../../../utils/file-parser.ts";
import { main } from "../../puzzle1.ts";

Deno.test("puzzle1", async () => {
  // given
  const puzzleData = await parseFileAsArray(
    `${import.meta.url}`,
    "../data_test.txt"
  );
  const expectedResult = 26397;

  // when
  const res = main(puzzleData);

  // then
  assertEquals(res, expectedResult);
});
