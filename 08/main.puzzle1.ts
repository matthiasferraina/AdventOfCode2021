const validLength = [2, 3, 4, 7];
export function puzzle1(data: string[]): number {
  // format data
  return data
    .map((el) =>
      el
        .split(" | ")[1]
        .split(" ")
        .filter((el) => validLength.some((vl) => vl === el.length))
    )
    .flat()
    .length;
}
