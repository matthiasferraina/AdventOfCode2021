import { assertEquals } from "../../../deps-dev.ts";
import { parseFileAsArray } from "../../../utils/file-parser.ts";
import { main } from "../../puzzle2.ts";

Deno.test("puzzle2", async () => {
  // given
  const puzzleData = await parseFileAsArray(
    `${import.meta.url}`,
    "../data_test.txt"
  );
  const expectedResult = 288957;

  // when
  const res = main(puzzleData);

  // then
  assertEquals(res, expectedResult);
});
