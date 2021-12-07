export type FishNumber = {
  number: number;
  occurences: number;
};

export function puzzle2(data: string[]): number {
  // format data
  const lanternfishs = data
    .map((el) => el.split(","))
    .flat()
    .map(
      (el) =>
        ({
          number: Number(el),
          occurences: 1,
        } as FishNumber)
    );
  console.log(
    "🚀 ~ file: main.puzzle2.ts ~ line 13 ~ puzzle1 ~ lanternfishs",
    lanternfishs
  );

  let cycles = 18;

  while (cycles > 0) {
    makeLanternFishLove(lanternfishs);

    cycles--;
  }

  console.log(lanternfishs);

  return 0;
}

const makeLanternFishLove = (lanternfishs: FishNumber[]): void => {
  for (let i = 0; i < lanternfishs.length; i++) {
    console.log(lanternfishs);
    const agregatedFishs = lanternfishs.reduce(
      (acc: FishNumber[], curr: FishNumber): FishNumber[] => {
        const existingFishNumber = acc.filter(
          (el: FishNumber) => el.number === curr.number
        );
        return (existingFishNumber[0].occurences += curr.occurences);
      },
      []
    );
    console.log(
      "🚀 ~ file: main.puzzle2.ts ~ line 42 ~ agregatedFishs ~ agregatedFishs",
      agregatedFishs
    );
  }
};
