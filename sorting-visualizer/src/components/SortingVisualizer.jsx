import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";
import { insertionSort } from "../algorithms/insertionSort";
import { mergeSort } from "../algorithms/mergeSort";
import { quickSort } from "../algorithms/quickSort";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [barCount, setBarCount] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [inputArray, setInputArray] = useState("");
  const [activeIndices, setActiveIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("Bubble Sort");
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const stopRef = useRef(false);

  useEffect(() => {
    generateNewArray();
  }, [barCount]);

  const generateNewArray = () => {
    const newArr = Array.from({ length: barCount }, () =>
      Math.floor(Math.random() * 300 + 20)
    );
    setArray(newArr);
    setActiveIndices([]);
    setComparisons(0);
    setSwaps(0);
    setInputArray(newArr.join(","));
  };

  const handleInputChange = (e) => {
    setInputArray(e.target.value);
    const parsed = e.target.value
      .split(",")
      .map((num) => parseInt(num))
      .filter((n) => !isNaN(n));
    setArray(parsed);
    setBarCount(parsed.length);
  };

  const getAnimations = () => {
    switch (algorithm) {
      case "Bubble Sort":
        return bubbleSort(array.slice());
      case "Selection Sort":
        return selectionSort(array.slice());
      case "Insertion Sort":
        return insertionSort(array.slice());
      case "Merge Sort":
        return mergeSort(array.slice());
      case "Quick Sort":
        return quickSort(array.slice());
      default:
        return [];
    }
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    stopRef.current = false;

    const animations = getAnimations();
    const arr = array.slice();
    let comp = 0;
    let swp = 0;

    for (let i = 0; i < animations.length; i++) {
      if (stopRef.current) break;

      const { type, indices, index, value } = animations[i];

      if (type === "compare") {
        comp++;
        setActiveIndices(indices);
      } else if (type === "swap") {
        swp++;
        const [i, j] = indices;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setActiveIndices([i, j]);
      } else if (type === "overwrite") {
        arr[index] = value;
        setArray([...arr]);
        setActiveIndices([index]);
      }

      setComparisons(comp);
      setSwaps(swp);
      await new Promise((r) => setTimeout(r, 100 - speed));
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  const stopSorting = () => {
    stopRef.current = true;
    setIsSorting(false);
  };

  const getBarColor = (index) =>
    activeIndices.includes(index) ? "bg-red-500" : "bg-indigo-500";

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
      {/* Left Section */}
      <div className="flex-1">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          <span className="text-purple-500">Sorting</span>{" "}
          <span className="text-white dark:text-white">Visualizer</span>
        </h1>

        {/* Controls */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md flex flex-wrap items-center justify-center gap-4 mb-6">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-gray-100 dark:bg-slate-700 text-black dark:text-white px-4 py-2 rounded shadow"
          >
            <option>Bubble Sort</option>
            <option>Selection Sort</option>
            <option>Insertion Sort</option>
            <option>Merge Sort</option>
            <option>Quick Sort</option>
          </select>

          <div className="flex flex-col items-center text-xs">
            <label className="text-gray-700 dark:text-gray-300">
              Elements: {barCount}
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={barCount}
              onChange={(e) => setBarCount(Number(e.target.value))}
              className="w-32 accent-purple-500"
            />
          </div>

          <div className="flex flex-col items-center text-xs">
            <label className="text-gray-700 dark:text-gray-300">
              Speed: {speed}ms
            </label>
            <input
              type="range"
              min="1"
              max="99"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-32 accent-purple-500"
            />
          </div>

          <button
            onClick={generateNewArray}
            className="bg-slate-200 dark:bg-slate-600 text-black dark:text-white px-4 py-2 rounded hover:bg-slate-300 dark:hover:bg-slate-700"
          >
            Generate Array
          </button>

          <button
            onClick={handleSort}
            disabled={isSorting}
            className={`px-4 py-2 rounded ${
              isSorting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            ▶ Sort
          </button>

          <button
            onClick={stopSorting}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            ⏸ Pause
          </button>
        </div>

        {/* Array Input */}
        <input
          value={inputArray}
          onChange={handleInputChange}
          className="w-full mb-6 px-4 py-2 border rounded shadow bg-gray-50 dark:bg-slate-800 dark:text-white"
        />

        {/* Bars */}
        <div className="flex items-end justify-center h-[400px] gap-[2px] bg-white dark:bg-slate-800 rounded shadow p-2 transition-all">
          {array.map((val, idx) => (
            <div
              key={idx}
              className={`flex items-end justify-center text-xs font-bold text-white ${getBarColor(
                idx
              )} transition-all`}
              style={{
                height: `${val}px`,
                width: `${1000 / barCount}px`,
                borderRadius: "4px",
                position: "relative",
              }}
            >
              <span className="absolute -top-6 text-black dark:text-white">
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <Sidebar algorithm={algorithm} comparisons={comparisons} swaps={swaps} />
    </div>
  );
};

export default SortingVisualizer;
