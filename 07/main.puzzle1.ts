export function puzzle1(data: string[]): number {
  // format data
  const crabs = data
    .map((el) => el.split(","))
    .flat()
    .map(Number);
  console.log("🚀 ~ file: main.puzzle1.ts ~ line 9 ~ puzzle1 ~ crabs", crabs);

  let minimumFuel = 100000000000;
  for (let i = 0; i < crabs.length; i++) {
    let currentMinimumFuel = 0;
    for (let j = 0; j < crabs.length; j++) {
      currentMinimumFuel = currentMinimumFuel + Math.abs(crabs[j] - i);
    }
    if (currentMinimumFuel < minimumFuel) {
      minimumFuel = currentMinimumFuel;
    }
  }

  return minimumFuel;
}
