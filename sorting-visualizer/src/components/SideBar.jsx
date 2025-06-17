import React from "react";

const complexityMap = {
  "Bubble Sort": {
    time: "O(n²)",
    space: "O(1)",
  },
  "Selection Sort": {
    time: "O(n²)",
    space: "O(1)",
  },
  "Insertion Sort": {
    time: "O(n²)",
    space: "O(1)",
  },
  "Merge Sort": {
    time: "O(n log n)",
    space: "O(n)",
  },
  "Quick Sort": {
    time: "O(n log n)",
    space: "O(log n)",
  },
};

const Sidebar = ({ algorithm = "Bubble Sort", comparisons = 0, swaps = 0 }) => {
  const complexity = complexityMap[algorithm];

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md dark:shadow-lg rounded-lg p-5 w-full max-w-xs">
      <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
        {algorithm}
      </h2>

      <div className="mt-4 space-y-4 text-sm">
        <div className="flex justify-between">
          <span>Comparisons:</span>
          <span>{comparisons}</span>
        </div>
        <div className="flex justify-between">
          <span>Swaps:</span>
          <span>{swaps}</span>
        </div>

        <hr className="border-gray-300 dark:border-gray-600" />

        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">Time Complexity</p>
          <ul className="ml-4 list-disc text-gray-600 dark:text-gray-400">
            <li>Best: Ω(n)</li>
            <li>Average: {complexity?.time}</li>
            <li>Worst: {complexity?.time}</li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">Space Complexity</p>
          <ul className="ml-4 list-disc text-gray-600 dark:text-gray-400">
            <li>Auxiliary: {complexity?.space}</li>
            <li>Input: O(n)</li>
            <li>Overall: O(n)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
