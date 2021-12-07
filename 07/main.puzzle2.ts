export function puzzle2(data: string[]): number {
  // format data
  const crabs = data
    .map((el) => el.split(","))
    .flat()
    .map(Number)
    .sort((a, b) => b - a);

  let minimumFuel = 10000000000;
  for (let i = 0; i < crabs.length; i++) {
    let currentMinimumFuel = 0;
    for (let j = 0; j < crabs.length; j++) {
      const gap = Math.abs(crabs[j] - i);
      let count = 0;
      for (let k = 0; k <= gap; k++) {
        count = count + k;
      }
      currentMinimumFuel = currentMinimumFuel + count;
    }

    if (currentMinimumFuel < minimumFuel) {
      minimumFuel = currentMinimumFuel;
    }
  }

  return minimumFuel;
}
