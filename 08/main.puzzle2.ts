const validLength = [2, 3, 4, 7];
export function puzzle2(data: string[]): number {
  // format data
  const formattedData = data
    .map((el) =>
      el
        .split(" | ")
        .map((el) => [el.split(" ")])
        .flat()
    )
    .map((el) => [
      el[0].reduce((acc: any, curr) => {
        console.log((acc[curr] = null));
        return acc;
      }, {}),
      el[1],
    ]);
  const decodedData = formattedData.map((el) => {
    const toDecode = el[0];
    const decoder = Array(10).fill(0);
    const decoded = Object.keys(toDecode).sort((a, b) => a.length - b.length);
    decoded.forEach((el) => {
      el.length === 2 && decoder.splice(1, 1, el);
      el.length === 3 && decoder.splice(7, 1, el);
      el.length === 4 && decoder.splice(4, 1, el);
      el.length === 7 && decoder.splice(8, 1, el);
    });
    // 3 => 7 et length 5
    // 9 => 3 et length 6
    // 0 => inclu 1 et length 6
    // 6 => dernier longueur 6 et null
    // 2 => length 5 
    // 5
    console.log(decoder);

    return [toDecode, el[1]];
  });
  console.log(
    "🚀 ~ file: main.puzzle2.ts ~ line 23 ~ decodedData ~ decodedData",
    decodedData
  );
  return 0;
}
