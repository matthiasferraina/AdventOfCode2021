import { assertEquals } from "../../deps-dev.ts";
import { parseFileAsArray } from "../../utils/file-parser.ts";
import { puzzle1 } from "../main.puzzle1.ts";

Deno.test("puzzle1", async (t) => {
  await t.step("Given a ", async (t) => {
    await t.step("When the ", async (t) => {
      await t.step("Then it should return ", async () => {
        const dataFromFile = await parseFileAsArray(
          `${import.meta.url}`,
          "data",
        );
        const data = dataFromFile;
        const expected = 1;

        assertEquals(puzzle1(data), expected);
      });
    });
  });
});