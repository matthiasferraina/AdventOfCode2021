import { assertEquals } from "../deps-dev.ts";
import {
  computeFinalScore,
  Player,
  Dice,
  rollDice,
  computePlayerScore,
  getPlayerPosition,
  isGameFinished,
  game,
} from "./main.ts";

Deno.test("isGameFinished(:player1, :player2)", async (t) => {
  await t.step("Given 2 players with a score of 999", async (t) => {
    const player1 = {
      score: 999,
      position: 4,
    };
    const player2 = {
      score: 999,
      position: 4,
    };
    await t.step("Calling method with the 2 players", async (t) => {
      const result = isGameFinished(player1, player2);
      await t.step("The game should not be finished", () => {
        assertEquals(result, false);
      });
    });
  });
  await t.step("Given the first player with a score of 1000", async (t) => {
    const player1 = {
      score: 1000,
      position: 4,
    };
    const player2 = {
      score: 999,
      position: 4,
    };
    await t.step("Calling method the 2 players", async (t) => {
      const result = isGameFinished(player1, player2);
      await t.step("The game should be finished", () => {
        assertEquals(result, true);
      });
    });
  });
  await t.step("Given the second player with a score of 1000", async (t) => {
    const player1 = {
      score: 999,
      position: 4,
    };
    const player2 = {
      score: 1000,
      position: 4,
    };
    await t.step("Calling method the 2 players", async (t) => {
      const result = isGameFinished(player1, player2);
      await t.step("The game should be finished", () => {
        assertEquals(result, true);
      });
    });
  });
});

Deno.test("getPlayerPosition(:position, :sumOfRolls)", async (t) => {
  await t.step(
    "Given a player with a position of 4 and 3 rolls 1+2+3",
    async (t) => {
      const player = {
        score: 100,
        position: 4,
      };
      const sumOfRolls = 6;
      await t.step("Calling method with player and sum of rolls", async (t) => {
        const result = getPlayerPosition(player.position, sumOfRolls);
        await t.step("Get the updated player position", () => {
          assertEquals(result, 10);
        });
      });
    }
  );
  await t.step(
    "Given a player with a position of 4 and 3 rolls 7+8+9",
    async (t) => {
      const player = {
        score: 100,
        position: 10,
      };
      const sumOfRolls = 24;
      await t.step("Calling method with player and sum of rolls", async (t) => {
        const result = getPlayerPosition(player.position, sumOfRolls);
        await t.step("Get the updated player position", () => {
          assertEquals(result, 4);
        });
      });
    }
  );

  await t.step(
    "Given a player with a position of 6 and 3 rolls 19+20+21",
    async (t) => {
      const player = {
        score: 100,
        position: 6,
      };
      const sumOfRolls = 60;
      await t.step("Calling method with player and sum of rolls", async (t) => {
        const result = getPlayerPosition(player.position, sumOfRolls);
        await t.step("Get the updated player position", () => {
          assertEquals(result, 6);
        });
      });
    }
  );
});

Deno.test("computePlayerScore(:score, :position)", async (t) => {
  await t.step(
    "Given a player with a score of 100 and at the position 4",
    async (t) => {
      const player = {
        score: 100,
        position: 4,
      };
      await t.step("Calling method with player", async (t) => {
        const result = computePlayerScore(player.score, player.position);
        await t.step("Get the updated player score", () => {
          assertEquals(result, 104);
        });
      });
    }
  );
});

Deno.test("launchDice(:dice)", async (t) => {
  await t.step("Given a deterministic dice", async (t) => {
    const dice = {
      currentValue: 1,
      numberOfRolls: 0,
    };
    await t.step("Rolling the dice", async (t) => {
      const updatedDice = rollDice(dice);
      await t.step(
        "Then number of rolls and current value is incremented",
        () => {
          assertEquals(updatedDice.currentValue, 2);
          assertEquals(updatedDice.numberOfRolls, 1);
        }
      );
    });
  });
  await t.step(
    "Given a deterministic 100-side dice with currentValue is 100",
    async (t) => {
      const dice = {
        currentValue: 100,
        numberOfRolls: 32,
      };
      await t.step("Rolling the dice", async (t) => {
        const updatedDice = rollDice(dice);
        await t.step(
          "Then number of rolls is incremented and currentValue is set to 1",
          () => {
            assertEquals(updatedDice.currentValue, 1);
            assertEquals(updatedDice.numberOfRolls, 33);
          }
        );
      });
    }
  );
});

// score final
Deno.test("computeFinalScore(:player1, :player2, :dice)", async (t) => {
  await t.step("Given two players and a dice", async (t) => {
    const player1 = {
      score: 1001,
    } as Player;
    const player2 = {
      score: 999,
    } as Player;
    const dice = {
      numberOfRolls: 3,
    } as Dice;
    await t.step("Calling method with player2 loosing", async (t) => {
      const result = computeFinalScore(player1, player2, dice);
      await t.step("Get the final score", () => {
        assertEquals(result, 2997);
      });
    });
  });
});

Deno.test("game", async (t) => {
  await t.step("given 2 players and a dice", async (t) => {
    const player1 = {
      score: 0,
      position: 4,
    };

    const player2 = {
      score: 0,
      position: 8,
    };

    const dice = {
      currentValue: 1,
      numberOfRolls: 0,
    };
    await t.step("game result should be ", () => {
      const result = game(player1, player2, dice);
      assertEquals(result, 739785);
    });
  });
});
