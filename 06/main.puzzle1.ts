const arrayMaxLength = 2100000;

export function puzzle1(data: string[]): number {
  // format data
  const lanternfishs = data
    .map((el) => el.split(","))
    .flat()
    .map(Number);

  let cycles = 18;

  while (cycles > 0) {
    makeLanternFishLove(lanternfishs);

    cycles--;
  }

  return lanternfishs.length;
}

const makeLanternFishLove = (lanternfishs:number[]): void => {
  let newLanternFishsToAdd = 0;
    for (let i = 0; i < lanternfishs.length; i++) {
      const fishBench = lanternfishs[i];
      if (fishBench === 0) {
        newLanternFishsToAdd++;
        lanternfishs[i] = 6;
      } else {
        lanternfishs[i] -= 1;
      }
    }

  if (newLanternFishsToAdd > 0) {
    for (let h = 0; h < newLanternFishsToAdd; h++) {
      lanternfishs.push(8);
    }
  }
};
