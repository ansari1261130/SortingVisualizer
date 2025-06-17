export const quickSort = (arr) => {
  const animations = [];
  const a = arr.slice();

  const partition = (low, high) => {
    const pivot = a[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      animations.push({ type: "compare", indices: [j, high] });
      if (a[j] < pivot) {
        i++;
        animations.push({ type: "swap", indices: [i, j] });
        [a[i], a[j]] = [a[j], a[i]];
      }
    }
    animations.push({ type: "swap", indices: [i + 1, high] });
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    return i + 1;
  };

  const quickSortHelper = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  };

  quickSortHelper(0, a.length - 1);
  return animations;
};
