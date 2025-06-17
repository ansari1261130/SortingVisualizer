export const mergeSort = (arr) => {
  const animations = [];
  const a = arr.slice();

  const merge = (start, mid, end) => {
    let left = a.slice(start, mid + 1);
    let right = a.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      animations.push({ type: "compare", indices: [start + i, mid + 1 + j] });
      if (left[i] <= right[j]) {
        animations.push({ type: "overwrite", index: k, value: left[i] });
        a[k++] = left[i++];
      } else {
        animations.push({ type: "overwrite", index: k, value: right[j] });
        a[k++] = right[j++];
      }
    }

    while (i < left.length) {
      animations.push({ type: "overwrite", index: k, value: left[i] });
      a[k++] = left[i++];
    }
    while (j < right.length) {
      animations.push({ type: "overwrite", index: k, value: right[j] });
      a[k++] = right[j++];
    }
  };

  const mergeSortHelper = (start, end) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(start, mid);
    mergeSortHelper(mid + 1, end);
    merge(start, mid, end);
  };

  mergeSortHelper(0, a.length - 1);
  return animations;
};
