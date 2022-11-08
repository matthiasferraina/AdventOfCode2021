import { assertEquals, describe, it } from "../../../deps-dev.ts";
import {
  findCorruptedChar,
  getCorruptedCharacterScore,
  isClosingCharacter,
  isOpeningCharacter,
} from "../../lib.ts";

describe("isOpeningCharacter", () => {
  ["[", "{", "<", "("].forEach((char: string) => {
    it(`returns true when the character is ${char}`, () => {
      // when
      const result = isOpeningCharacter(char);

      // then
      assertEquals(result, true);
    });
  });

  ["]", "}", ">", ")"].forEach((char: string) => {
    it(`returns false when the character is ${char}`, () => {
      // when
      const result = isOpeningCharacter(char);

      // then
      assertEquals(result, false);
    });
  });
});

describe("isClosingCharacter", () => {
  ["]", "}", ">", ")"].forEach((char: string) => {
    it(`returns true when the character is ${char}`, () => {
      // when
      const result = isClosingCharacter(char);

      // then
      assertEquals(result, true);
    });
  });
  ["[", "{", "<", "("].forEach((char: string) => {
    it(`returns false when the character is ${char}`, () => {
      // when
      const result = isClosingCharacter(char);

      // then
      assertEquals(result, false);
    });
  });
});

describe("findCorruptedChar", () => {
  it("should return the corrupted character in the line", () => {
    // given
    const line = "{([(<{}[<>[]}>{[]{[(<()>";
    const expectedIllegalCharracter = "}";
    // when
    const illegalCharacter = findCorruptedChar(line);

    // then
    assertEquals(expectedIllegalCharracter, illegalCharacter);
  });

  it("should return null if there is no corrupted  character in the line", () => {
    // given
    const line = "[({(<(())[]>[[{[]{<()<>>";

    // when
    const illegalCharacter = findCorruptedChar(line);

    // then
    assertEquals(null, illegalCharacter);
  });
});

describe("getCorruptedCharacterScore", () => {
  [
    {
      char: "}",
      score: 1197,
    },
    {
      char: ")",
      score: 3,
    },
    {
      char: "]",
      score: 57,
    },
    {
      char: ">",
      score: 25137,
    },
    {
      char: null,
      score: 0,
    },
  ].forEach(({ char, score }) => {
    it(`should return score of ${score} for char ${char}`, () => {
      // when
      const corruptedScore = getCorruptedCharacterScore(char);

      // then
      assertEquals(corruptedScore, score);
    });
  });
});
