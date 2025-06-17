export const insertionSort = (arr) => {
  const animations = [];
  const a = arr.slice();

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      animations.push({ type: "compare", indices: [j, j + 1] });
      animations.push({ type: "overwrite", index: j + 1, value: a[j] });
      a[j + 1] = a[j];
      j--;
    }
    animations.push({ type: "overwrite", index: j + 1, value: key });
    a[j + 1] = key;
  }

  return animations;
};
