type Point = {
  x: number;
  y: number;
};

type Grid = number[][];
export function formatLine(line: string): Point[] {
  const formattedLine: Point[] = [];
  const tmp = line.split(" -> ").map((el) => el.split(",").map(Number));
  tmp.forEach((coordinate: number[]) => {
    formattedLine.push({ x: coordinate[0], y: coordinate[1] });
  });
  return formattedLine;
}
