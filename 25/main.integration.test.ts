import { main } from './main.ts';
import { assertEquals } from "../deps-dev.ts";

Deno.test("puzzle1", async (t) => {
  await t.step("Given a ", async (t) => {
    await t.step("When the ", async (t) => {
      await t.step("Then it should return ", async () => {
        const foundNumber = await main();
        assertEquals(foundNumber,58)
      });
    });
  });
});
