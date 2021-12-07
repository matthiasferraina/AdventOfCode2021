let cycles = 18;

export function puzzle2(data: string[]): number {
  let fishCounter: Record<string, number> = {};
  const lanternfishs = data.map((el) => el.split(",").map(Number)).flat();

  lanternfishs.forEach(
    (el) => (fishCounter[el] = fishCounter[el] ? fishCounter[el] + 1 : 1)
  );

  while (cycles > 0) {
    const newLanternFishs: Record<string, number> = {};
    Object.keys(fishCounter)
      .sort((a, b) => Number(b) - Number(a))
      .forEach((key: string) => {
        if (Number(key) !== 0) {
          newLanternFishs[Number(key) - 1] = fishCounter[key];
        } else {
          newLanternFishs["6"] = (newLanternFishs["6"] || 0) + fishCounter[key];
        }
      });

    if (fishCounter["0"]) newLanternFishs["8"] = fishCounter["0"];
    fishCounter = newLanternFishs;
    cycles--;
  }
  return Object.values(fishCounter).reduce((a: number, b: number) => a + b, 0);
}
