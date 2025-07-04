export const bubbleSort = (arr) => {
  const animations = [];
  const a = arr.slice();

  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      animations.push({ type: "compare", indices: [j, j + 1] });
      if (a[j] > a[j + 1]) {
        animations.push({ type: "swap", indices: [j, j + 1] });
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }

  return animations;
};
