import { assertEquals, describe, it } from "../../../deps-dev.ts";
import {
  computeCompletionSequenceScore,
  filterCorruptedLines,
  findClosingSequence,
  findCorruptedChar,
  findMiddleNumber,
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

describe("filterCorruptedLines", () => {
  it("should filter corrupted lines from data", () => {
    // given
    const lines = ["{([(<{}[<>[]}>{[]{[(<()>", "[({(<(())[]>[[{[]{<()<>>"];
    const expectedIncompleteLine = "[({(<(())[]>[[{[]{<()<>>";

    // when
    const filteredLines = filterCorruptedLines(lines);

    // then
    assertEquals(expectedIncompleteLine, filteredLines[0]);
  });
});

describe("findClosingSequence", () => {
  it("should find the closing sequence of characters for an incomplete line", () => {
    // given
    const incompleteLine = "[({(<(())[]>[[{[]{<()<>>";
    const expectedClosingSequence = "}}]])})]";

    // when
    const closingSequence = findClosingSequence(incompleteLine);

    // then
    assertEquals(closingSequence, expectedClosingSequence);
  });
});

describe("computeCompletionSequenceScore", () => {
  it("should return the score for a completion sequence", () => {
    // given
    const completionSequence = "])}>";
    const expectedScore = 294;

    // when
    const score = computeCompletionSequenceScore(completionSequence);

    //
    assertEquals(score, expectedScore);
  });
});

describe("findMiddleNumber", () => {
  it("should work with a non sorted array of numbers", () => {
    // given
    const oddArrayOfNumbers = [1, 4, 5, 2, 3];
    const expectedMiddleNumber = 3;

    // when
    const middleNumber = findMiddleNumber(oddArrayOfNumbers);

    // then
    assertEquals(middleNumber, expectedMiddleNumber);
  });
  it("should find the middle number for an odd array of numbers", () => {
    // given
    const oddArrayOfNumbers = [1, 2, 3, 4, 5];
    const expectedMiddleNumber = 3;

    // when
    const middleNumber = findMiddleNumber(oddArrayOfNumbers);

    // then
    assertEquals(middleNumber, expectedMiddleNumber);
  });
});
