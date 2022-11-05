export function puzzle1(data: string[]): number {
  // format data
  const smokes = data.map((el) =>
    el
      .split(",")
      .map((el) => el.split("").map(Number))
      .flat()
  );
  const lowerSmoke = [];
  for (let row = 0; row < smokes.length; row++) {
    for (let col = 0; col < smokes[0].length; col++) {
      const buble = smokes[row][col];

      if (
        col > 0 &&
        col < smokes[0].length - 1 &&
        row > 0 &&
        row < smokes.length - 1
      ) {
        if (
          buble < smokes[row - 1][col] &&
          buble < smokes[row + 1][col] &&
          buble < smokes[row][col - 1] &&
          buble < smokes[row][col + 1]
        ) {
          lowerSmoke.push(buble);
        }
      }

      if (col === 0 && row === 0) {
        if (buble < smokes[row + 1][col] && buble < smokes[row][col + 1]) {
          lowerSmoke.push(buble);
        }
      }

      if (col === smokes[0].length - 1 && row === smokes.length - 1) {
        if (buble < smokes[row - 1][col] && buble < smokes[row][col - 1]) {
          lowerSmoke.push(buble);
        }
      }

      if (col === smokes[0].length - 1 && row === 0) {
        console.log("BOYAKA");

        if (buble < smokes[row + 1][col] && buble < smokes[row][col - 1]) {
          lowerSmoke.push(buble);
        }
      }

      if (col === 0 && row === smokes.length - 1) {
        if (buble < smokes[row - 1][col] && buble < smokes[row][col + 1]) {
          lowerSmoke.push(buble);
        }
      }

      if (row === 0 && col !== 0 && col !== smokes[0].length - 1) {
        if (
          buble < smokes[row][col - 1] &&
          buble < smokes[row][col + 1] &&
          buble < smokes[row + 1][col]
        ) {
          lowerSmoke.push(buble);
        }
      }

      if (
        row === smokes.length - 1 &&
        col !== 0 &&
        col !== smokes[0].length - 1
      ) {
        if (
          buble < smokes[row][col - 1] &&
          buble < smokes[row][col + 1] &&
          buble < smokes[row - 1][col]
        ) {
          lowerSmoke.push(buble);
        }
      }

      if (col === 0 && row !== 0 && row !== smokes.length - 1) {
        if (
          buble < smokes[row + 1][col] &&
          buble < smokes[row - 1][col] &&
          buble < smokes[row][col + 1]
        ) {
          lowerSmoke.push(buble);
        }
      }

      if (
        col === smokes[0].length - 1 &&
        row !== 0 &&
        row !== smokes.length - 1
      ) {
        if (
          buble < smokes[row + 1][col] &&
          buble < smokes[row - 1][col] &&
          buble < smokes[row][col - 1]
        ) {
          lowerSmoke.push(buble);
        }
      }
    }
  }
  console.log(lowerSmoke);

  return lowerSmoke.reduce((a, b) => a + b + 1,0);
}
