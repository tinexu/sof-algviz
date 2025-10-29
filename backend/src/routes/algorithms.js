const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Allow requests from your React app
app.use(express.json()); // Parse JSON request bodies


// bubble sort implimentation
function bubbleSort(array) {
    const arr = [...array]; // Create a copy of the array 

    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
    var i, j, temp;
    var swapped;
    const steps = []; // record everything at each step for frontent visualisation
    
    for (i = 0; i < n - 1; i++){
        swapped = false;
        for (j = 0; j < n - i - 1; j++){
            comparisons++;
            // Record the comparison step
            steps.push({
                type: 'compare',
                indices: [j, j + 1],
                array: [...arr],
                compating: [arr[j], arr[j + 1]],
            });
            if (arr[j] > arr[j + 1]) 
            {
                // Swap arr[j ] and arr[j+1]
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
                swaps++;
                // Record the swap step
                steps.push({
                    type: 'swap',
                    indices: [j, j + 1],
                    array: [...arr],
                    swapped: [arr[j], arr[j + 1]],
                });
            }
        }
        // record the array each time it completes a pass
        steps.push({
            type: 'passComplete',
            pass: i + 1,
            array: [...arr],
            sortedUpTo: n - i - 1,
        });

        // IF no two elements were swapped by inner loop, then break
        if (!swapped) break;
    }

    return {
        sorted: arr,
        steps: steps,
        metrics: {
            comparisons: comparisons,
            swaps: swaps,
            passes: arr.length - 1
        }
    };
}

app.post('/api/sort/bubble', (req, res) => {
    const { array } = req.body;
    
    if (!Array.isArray(array) || !array.every(Number.isFinite)) {
        return res.status(400).json({ error: 'Invalid input. Please provide an array of numbers.' });
    }
    const result = bubbleSort(array);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
