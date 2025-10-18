import React, { useState } from 'react';
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
      pseudocode:
        `procedure bubbleSort(A):
n = length(A)
  for i from 0 to n - 1:
    for j from 0 to n - i - 2:
      if A[j] > A[j + 1]:
        swap(A[j], A[j + 1])
   return A
`},
    {
      id: 'merge',
      name: 'Merge Sort',
      desc: 'Divides the array and merges sorted halves efficiently.',
      pseudocode:
        `function mergeSort(A):
    if length(A) <= 1:
        return A
    mid = length(A) / 2
    left  = A[0 : mid]
    right = A[mid : end]
    left_sorted  = mergeSort(left)
    right_sorted = mergeSort(right)
    return merge(left_sorted, right_sorted)
`
    },
    {
      id: 'quick',
      name: 'Quick Sort',
      desc: 'Selects a pivot and partitions elements around it recursively.',
      pseudocode:
        `procedure quickSort(A, low, high):
    if low < high:
        pivotIndex = partition(A, low, high)
        quickSort(A, low, pivotIndex - 1)
        quickSort(A, pivotIndex + 1, high)

procedure partition(A, low, high):
    pivot = A[high]
    i = low - 1
    for j from low to high - 1:
        if A[j] <= pivot:
            i = i + 1
            swap(A[i], A[j])
    swap(A[i + 1], A[high])
    return i + 1
`
    },
    {
      id: 'selection',
      name: 'Selection Sort',
      desc: 'Selects the smallest element and places it at the front each pass.',
      pseudocode: `TO DO`
    },
    {
      id: 'insertion',
      name: 'Insertion Sort',
      desc: 'Builds the sorted array one item at a time by insertion.',
      pseudocode: `TO DO `
    },
    {
      id: 'heap',
      name: 'Heap Sort',
      desc: 'Build a heap, then repeatedly remove the max/min.',
      pseudocode: `TODO`
    },
  ];

  const dataStructures = [
    { id: 'stack', name: 'Stack', desc: 'Stores items in a LIFO (Last-In, First-Out) order.' },
    { id: 'queue', name: 'Queue', desc: 'Stores items in a FIFO (First-In, First-Out) order.' },
    { id: 'linkedlist', name: 'Linked List', desc: 'Sequence of nodes connected by pointers.' },
    { id: 'binarytree', name: 'Binary Tree', desc: 'Hierarchical structure with nodes having up to two children.' },
    { id: 'hashmap', name: 'Hash Map', desc: 'Uses a hash function to map keys to slots.' },

  ];

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
                add like time complexities for sorting algs and stuff like that // in depth descriptions  
              </div>
              )}
              {/* LEFT: visualization area */}
              <div className="algorithm-screen-bottom">
              <div className="visualization-area">
                <p className="placeholder">D3 Visualization Area // Buttons and stuff // Python calls</p>
                <svg id="visualization"></svg>
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
