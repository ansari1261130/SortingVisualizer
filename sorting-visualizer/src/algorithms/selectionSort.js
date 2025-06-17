export const selectionSort = (arr) => {
  const animations = [];
  const a = arr.slice();

  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      animations.push({ type: "compare", indices: [minIdx, j] });
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      animations.push({ type: "swap", indices: [i, minIdx] });
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
  }

  return animations;
};
