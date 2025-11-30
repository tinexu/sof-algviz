import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import { visualize } from "./SortingAlgs.jsx";

import './App.css';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showAllSorting, setShowAllSorting] = useState(false);
  const [showAllStructures, setShowAllStructures] = useState(false);

  const sortingAlgorithms = [
    {
      id: 'bubble',
      name: 'Bubble Sort',
      desc: 'Repeatedly swaps adjacent elements if they are in the wrong order.',
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      pseudocode: `
  procedure bubbleSort(A):
      n = length(A)
      for i from 0 to n - 1:
          swapped = false
          for j from 0 to n - i - 2:
              if A[j] > A[j + 1]:
                  swap(A[j], A[j + 1])
                  swapped = true
          if not swapped:
              break
      return A
      `,
      explanation: `
  Think of the array as a line of people you keep walking past, swapping any out-of-order neighbors.
  Each full walk pushes the largest remaining item to the far right, like a big bubble rising to the top.
  You repeat walks, but they get shorter because the right side becomes permanently sorted.
  If you ever make a full pass with no swaps, you’re done—everything is already in order.
      `
    },

    {
      id: 'selection',
      name: 'Selection Sort',
      desc: 'Selects the smallest element and places it at the front each pass.',
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      pseudocode: `
  procedure selectionSort(A):
      n = length(A)
      for i from 0 to n - 2:
          minIndex = i
          for j from i + 1 to n - 1:
              if A[j] < A[minIndex]:
                  minIndex = j
          if minIndex ≠ i:
              swap(A[i], A[minIndex])
      return A
      `,
      explanation: `
  Imagine scanning the unsorted portion to “pick” the smallest item you can find and placing it at the front.
  You mark a boundary between the sorted left side and the unsorted right side.
  On each step, you search the right side for the global minimum and put it at the boundary,
  then move the boundary one step to the right. The left side grows in correct order from smallest upward.
      `
    },

    {
      id: 'insertion',
      name: 'Insertion Sort',
      desc: 'Builds the sorted array one item at a time by inserting into place.',
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      pseudocode: `
  procedure insertionSort(A):
      n = length(A)
      for i from 1 to n - 1:
          key = A[i]
          j = i - 1
          while j >= 0 and A[j] > key:
              A[j + 1] = A[j]
              j = j - 1
          A[j + 1] = key
      return A
      `,
      explanation: `
  Picture sorting playing cards in your hand: you take the next card and slide it left until it fits.
  You maintain a sorted left portion; for each new item, you shift any larger items one step right
  to make space, then drop the item into the gap where it belongs. The left side is always kept perfectly sorted.
      `
    },

    {
      id: 'merge',
      name: 'Merge Sort',
      desc: 'Divides the array and merges sorted halves efficiently.',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      pseudocode: `
  function mergeSort(A):
      if length(A) <= 1:
          return A
      mid = floor(length(A) / 2)
      left  = A[0 : mid]
      right = A[mid : end]
      left_sorted  = mergeSort(left)
      right_sorted = mergeSort(right)
      return merge(left_sorted, right_sorted)
  
  function merge(L, R):
      i = 0; j = 0
      result = []
      while i < length(L) and j < length(R):
          if L[i] <= R[j]:
              append L[i]; i++
          else:
              append R[j]; j++
      append remaining elements of L and R to result
      return result
      `,
      explanation: `
  You split the array into halves until you reach tiny pieces that are trivially sorted.
  Then you rebuild by “weaving” two sorted lists together: repeatedly take the smaller front item
  from the two lists and append it to the result. The power comes from the merge step, which cleanly
  combines two sorted sequences into one sorted sequence while preserving the order of equals.
      `
    },

    {
      id: 'quick',
      name: 'Quick Sort',
      desc: 'Selects a pivot and partitions elements around it recursively.',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      pseudocode: `
  procedure quickSort(A, low, high):
      if low < high:
          p = partition(A, low, high)
          quickSort(A, low, p - 1)
          quickSort(A, p + 1, high)
  
  procedure partition(A, low, high):
      pivot = A[high]
      i = low - 1
      for j from low to high - 1:
          if A[j] <= pivot:
              i = i + 1
              swap(A[i], A[j])
      swap(A[i + 1], A[high])
      return i + 1
      `,
      explanation: `
  Pick a pivot value and rearrange the array so that everything ≤ pivot goes to its left
  and everything > pivot goes to its right—this rearrangement is the core “partition” step.
  Now the pivot is in its final spot, and the problem splits naturally into two smaller subproblems
  on either side. Repeating this “partition-around-a-pivot” idea recursively sorts the whole array.
      `
    },

    {
      id: 'heap',
      name: 'Heap Sort',
      desc: 'Builds a heap, then repeatedly extracts the maximum/minimum element.',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      pseudocode: `
  procedure heapSort(A):
      buildMaxHeap(A)
      for i from length(A) - 1 down to 1:
          swap(A[0], A[i])
          heapify(A, 0, i)
  
  procedure buildMaxHeap(A):
      for i from floor(length(A)/2) - 1 down to 0:
          heapify(A, i, length(A))
  
  procedure heapify(A, i, n):
      largest = i
      left = 2 * i + 1
      right = 2 * i + 2
      if left < n and A[left] > A[largest]:
          largest = left
      if right < n and A[right] > A[largest]:
          largest = right
      if largest != i:
          swap(A[i], A[largest])q
          heapify(A, largest, n)
      `,
      explanation: `
  Visualize the array as a binary tree where each parent is larger than its children (a max-heap).
  First, you “heapify” the array so the largest value is at the root. Then you swap that root with
  the last element (placing the largest at the end, where it belongs) and shrink the active heap.
  Restore the heap property by sinking the new root down to where it fits, and repeat. It’s like
  doing selection by always having fast access to the current maximum via the heap.
      `
    }
  ];

  const dataStructures = [
    { id: 'stack', name: 'Stack', desc: 'Stores items in a LIFO (Last-In, First-Out) order.' },
    { id: 'queue', name: 'Queue', desc: 'Stores items in a FIFO (First-In, First-Out) order.' },
    { id: 'linkedlist', name: 'Linked List', desc: 'Sequence of nodes connected by pointers.' },
    { id: 'binarytree', name: 'Binary Tree', desc: 'Hierarchical structure with nodes having up to two children.' },
    { id: 'hashmap', name: 'Hash Map', desc: 'Uses a hash function to map keys to slots.' },

  ];

  useEffect(() => {
    if (selectedAlgorithm && selectedAlgorithm.pseudocode) {
      d3.select("#visualization").selectAll("*").remove();
      visualize();
    }
  }, [selectedAlgorithm]);


  const handleSelect = (algo) => setSelectedAlgorithm(algo);

  return (
    <div className="home">
      {/* ---------- NAVBAR ---------- */}
      <nav className="navbar">
        <div className="nav-title">Algorithm Visualizer</div>
        <img src="/momentum.jpg" alt="App logo" className="logo" />
        <div className="nav-links">
          <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
            Home
          </button>
          <button className={activeTab === 'sorting' ? 'active' : ''} onClick={() => setActiveTab('sorting')}>
            Sorting
          </button>
          <button className={activeTab === 'data' ? 'active' : ''} onClick={() => setActiveTab('data')}>
            Data Structures
          </button>
        </div>
      </nav>

      <main className="main">
        {!selectedAlgorithm ? (
          <div className="algorithm-selection">
            {/* HOME TAB */}
            {activeTab === 'home' && (
              <>
                <section className="category">
                  <h3>- Sorting Algorithms -</h3>
                  <div className="algorithm-buttons">
                    {(showAllSorting ? sortingAlgorithms : sortingAlgorithms.slice(0, 3)).map((algo) => (
                      <button
                        key={algo.id}
                        onClick={() => handleSelect(algo)}
                        className="algorithm-btn"
                      >
                        <strong>{algo.name}</strong>
                        <p className="algorithm-desc">{algo.desc}</p>
                      </button>
                    ))}
                  </div>
                  <button
                    className="view-btn"
                    onClick={() => setShowAllSorting(!showAllSorting)}
                  >
                    {showAllSorting ? 'View Less ▲' : 'View All ▼'}
                  </button>
                </section>
                <section className="category">
                  <h3>- Data Structures -</h3>
                  <div className="algorithm-buttons">
                    {(showAllStructures ? dataStructures : dataStructures.slice(0, 3)).map((algo) => (
                      <button
                        key={algo.id}
                        onClick={() => handleSelect(algo)}
                        className="algorithm-btn"
                      >
                        <strong>{algo.name}</strong>
                        <p className="algorithm-desc">{algo.desc}</p>
                      </button>
                    ))}
                  </div>
                  <button
                    className="view-btn"
                    onClick={() => setShowAllStructures(!showAllStructures)}
                  >
                    {showAllStructures ? 'View Less ▲' : 'View All ▼'}
                  </button>
                </section>
              </>
            )}
            {/* SORTING TAB */}
            {activeTab === 'sorting' && (
              <section className="category">
                <h3>Sorting Algorithms</h3>
                <div className="algorithm-buttons">
                  {sortingAlgorithms.map((algo) => (
                    <button
                      key={algo.id}
                      onClick={() => handleSelect(algo)}
                      className="algorithm-btn"
                    >
                      <strong>{algo.name}</strong>
                      <p className="algorithm-desc">{algo.desc}</p>
                    </button>
                  ))}
                </div>
              </section>
            )}
            {/* DATA STRUCTURES TAB */}
            {activeTab === 'data' && (
              <section className="category">
                <h3>Data Structures</h3>
                <div className="algorithm-buttons">
                  {dataStructures.map((algo) => (
                    <button
                      key={algo.id}
                      onClick={() => handleSelect(algo)}
                      className="algorithm-btn"
                    >
                      <strong>{algo.name}</strong>
                      <p className="algorithm-desc">{algo.desc}</p>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="algorithm-screen">
            <h1>{selectedAlgorithm.name}</h1>
            <div className="algorithm-content">
              {selectedAlgorithm.pseudocode && ( // no time complexities and stuff added yet so for now using this to prevent from showing in data struct screens
                <div className="algorithm-info">
                  <h2>- Time Complexity -</h2>
                  <div className="alg_time_complexities">
                    <p><span className='best'>Best:{selectedAlgorithm.best}</span></p>
                    <p><span className='worst'>Worst:{selectedAlgorithm.worst}</span></p>
                    <p><span className='avg'>Average:{selectedAlgorithm.average}</span></p>
                  </div>
                  <div className="alg_explination">
                    <p>{selectedAlgorithm.explanation}</p>
                  </div>
                </div>
              )}
              {/* LEFT: visualization area */}
              <div className="algorithm-screen-bottom">
                <div className="visualization-area">
                  <div className="visual">
                    <svg id="visualization"></svg>
                  </div>
                  <div className="visual_controls">
                    <span><p>Speed</p></span>
                    <button className="start">▶ Sort</button>
                    <button className="restart">↺ Reset</button>
                  </div>
                </div>

                {/* RIGHT: pseudocode area only for algorithms*/}
                {selectedAlgorithm.pseudocode && (
                  <div className="pseudocode-area">
                    <h3>Pseudocode</h3>
                    <pre className="pseudocode-block">
                      <code>{selectedAlgorithm.pseudocode}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedAlgorithm(null)}
              className="back-btn"
            >
              ← Back
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
