import { assertEquals } from "../deps-dev.ts";
import {
  moveEastCucumbers,
  moveCucumbersInOneLine,
  moveSouthCucumbers,
  cucumbersHerdAreTheSame,
} from "./main.ts";

Deno.test("moveCucumbersInOneLine", async (t) => {
  const cucumberType = ">";
  await t.step(
    "Given a line of sea cucumbers containing one sea cucumber not at the end of the line",
    async (t) => {
      await t.step("When there is a free space", async (t) => {
        const line = [".", ".", ".", ">", ".", ".", "."];
        await t.step("Then it should move to the right", (t) => {
          const newLine = moveCucumbersInOneLine(line, cucumberType);
          const expectedResult = [".", ".", ".", ".", ">", ".", "."];
          assertEquals(expectedResult, newLine);
        });
      });

      await t.step("When there is a free space", async (t) => {
        const line = [".", ".", ".", ">", ">", ">", "."];
        await t.step("Then it should move to the right", (t) => {
          const newLine = moveCucumbersInOneLine(line, cucumberType);
          const expectedResult = [".", ".", ".", ">", ">", ".", ">"];
          assertEquals(expectedResult, newLine);
        });
      });

      await t.step("When there is not a free space", async (t) => {
        await t.step("Then it should not move", (t) => {
          const line = [".", ".", ".", ">", ">", ">", "v"];
          const newLine = moveCucumbersInOneLine(line, cucumberType);
          const expectedResult = [".", ".", ".", ">", ">", ">", "v"];
          assertEquals(expectedResult, newLine);
        });
      });
    }
  );

  await t.step(
    "Given a line of sea cucumbers containing one sea cucumber at the end of the line",
    async (t) => {
      await t.step(
        "When there is a free space at the begining of the line",
        async (t) => {
          const line = [".", ".", ".", ".", ".", ".", ">"];
          await t.step(
            "Then it should move the cucumber at the begining",
            (t) => {
              const newLine = moveCucumbersInOneLine(line, cucumberType);
              const expectedResult = [">", ".", ".", ".", ".", ".", "."];
              assertEquals(expectedResult, newLine);
            }
          );
        }
      );

      await t.step(
        "When there is a free space at the begining of the line",
        async (t) => {
          const line = [">", ".", ".", ".", ".", ".", ">"];
          await t.step(
            "Then it should move the cucumber at the begining",
            (t) => {
              const newLine = moveCucumbersInOneLine(line, cucumberType);
              const expectedResult = [".", ">", ".", ".", ".", ".", ">"];
              assertEquals(expectedResult, newLine);
            }
          );
        }
      );
    }
  );
});

Deno.test("moveEastCucumbers", async (t) => {
  await t.step("Given multiple lines of sea cucumbers", async (t) => {
    await t.step("When ", (t) => {
      const initialLineOne = [".", ".", ".", ">", ">", ".", "."];
      const initialLineTwo = ["v", ">", ".", ">", ".", ".", ">"];
      const initialHerd = [initialLineOne, initialLineTwo];
      const expectedLineOne = [".", ".", ".", ">", ".", ">", "."];
      const expectedLineTwo = ["v", ".", ">", ".", ">", ".", ">"];
      const exepectedHerd = [expectedLineOne, expectedLineTwo];
      assertEquals(moveEastCucumbers(initialHerd), exepectedHerd);
    });
  });
});

Deno.test("moveSouthCucumbers", async (t) => {
  await t.step("Given multiple lines of sea cucumbers", async (t) => {
    await t.step("When it has south cucumbers in majority", (t) => {
      const initialLineOne = [".", ".", ".", "v", "v", ".", "v"];
      const initialLineTwo = ["v", ".", ".", ".", ".", ".", ">"];
      const initialHerd = [initialLineOne, initialLineTwo];
      const expectedLineOne = ["v", ".", ".", ".", ".", ".", "v"];
      const expectedLineTwo = [".", ".", ".", "v", "v", ".", ">"];
      const exepectedHerd = [expectedLineOne, expectedLineTwo];
      assertEquals(moveSouthCucumbers(initialHerd), exepectedHerd);
    });
  });
});

Deno.test("compareCucumbers", async (t) => {
  await t.step("Given multiple lines of sea cucumbers", async (t) => {
    await t.step("When cucumbers herd are the same", async (t) => {
      const before = [
        ["1", "2", "3"],
        ["4", "5", "6"],
      ];
      const after = [
        ["1", "2", "3"],
        ["4", "5", "6"],
      ];
      await t.step("Then return true", () => {
        assertEquals(cucumbersHerdAreTheSame(before, after), true);
      });
    });
    await t.step("When cucumbers herd are not the same", async (t) => {
      const before = [
        ["3", "2", "3"],
        ["4", "5", "5"],
      ];
      const after = [
        ["1", "2", "3"],
        ["4", "5", "6"],
      ];
      await t.step("Then return true", () => {
        assertEquals(cucumbersHerdAreTheSame(before, after), false);
      });
    });
  });
});
