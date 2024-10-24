const matrix = [
    [5,5,3,2],
    [8,3,5,5],
    [5,2,3,9],
    [9,3,5,3]
];

function getSorted3x3Windows(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let result = [];

    // Helper function to get value at (i, j) considering out-of-bound indices as 0
    const getValue = (i, j) => {
        if (i < 0 || i >= rows || j < 0 || j >= cols) {
            return 0;
        }
        return matrix[i][j];
    };

    // Iterate over each element of the matrix
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let window = [];

            // Collect all elements in the 3x3 window centered at (i, j)
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    window.push(getValue(i + di, j + dj));
                }
            }

            // Sort the window in increasing order
            window.sort((a, b) => a - b);

            // Add the sorted window to the result
            result.push(window);
        }
    }

    return result;
}

function getSorted5x5Windows(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let result = [];

    // Helper function to get value at (i, j) considering out-of-bound indices as 0
    const getValue = (i, j) => {
        if (i < 0 || i >= rows || j < 0 || j >= cols) {
            return 0;
        }
        return matrix[i][j];
    };

    // Iterate over each element of the matrix
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let window = [];

            // Collect all elements in the 5x5 window centered at (i, j)
            for (let di = -2; di <= 2; di++) {
                for (let dj = -2; dj <= 2; dj++) {
                    window.push(getValue(i + di, j + dj));
                }
            }

            // Sort the window in increasing order
            window.sort((a, b) => a - b);

            // Add the sorted window to the result
            result.push(window);
        }
    }

    return result;
}

function getSorted7x7Windows(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let result = [];

    // Helper function to get value at (i, j) considering out-of-bound indices as 0
    const getValue = (i, j) => {
        if (i < 0 || i >= rows || j < 0 || j >= cols) {
            return 0;
        }
        return matrix[i][j];
    };

    // Iterate over each element of the matrix
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let window = [];

            // Collect all elements in the 7x7 window centered at (i, j)
            for (let di = -3; di <= 3; di++) {
                for (let dj = -3; dj <= 3; dj++) {
                    window.push(getValue(i + di, j + dj));
                }
            }

            // Sort the window in increasing order
            window.sort((a, b) => a - b);

            // Add the sorted window to the result
            result.push(window);
        }
    }

    return result;
}



// Strategy Context
class MatrixExtractor {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    extract(sortedArrayMatrix, rows, cols) {
        return this.strategy(sortedArrayMatrix, rows, cols);
    }
}

// Strategy: Get Minimum Matrix
function getMinMatrix(sortedArrayMatrix, rows, cols) {
    const minMatrix = [];

    let index = 0;
    for (let i = 0; i < rows; i++) {
        let minRow = [];
        for (let j = 0; j < cols; j++) {
            const sortedArray = sortedArrayMatrix[index++];
            // Get the minimum value (first element in sorted array)
            minRow.push(sortedArray[0]);
        }
        minMatrix.push(minRow);
    }

    return minMatrix;
}

// Strategy: Get Maximum Matrix
function getMaxMatrix(sortedArrayMatrix, rows, cols) {
    const maxMatrix = [];

    let index = 0;
    for (let i = 0; i < rows; i++) {
        let maxRow = [];
        for (let j = 0; j < cols; j++) {
            const sortedArray = sortedArrayMatrix[index++];
            // Get the maximum value (last element in sorted array)
            maxRow.push(sortedArray[sortedArray.length - 1]);
        }
        maxMatrix.push(maxRow);
    }

    return maxMatrix;
}

// Strategy: Get Median Matrix
function getMedianMatrix(sortedArrayMatrix, rows, cols) {
    const medianMatrix = [];

    let index = 0;
    for (let i = 0; i < rows; i++) {
        let medianRow = [];
        for (let j = 0; j < cols; j++) {
            const sortedArray = sortedArrayMatrix[index++];
            // Get the median value (middle element in sorted array)
            const medianIndex = Math.floor(sortedArray.length / 2);
            medianRow.push(sortedArray[medianIndex]);
        }
        medianMatrix.push(medianRow);
    }

    return medianMatrix;
}

// Get sorted 3x3 windows for the matrix
const sortedArrayMatrix3x3 = getSorted3x3Windows(matrix);
const sortedArrayMatrix5x5 = getSorted5x5Windows(matrix);
const sortedArrayMatrix7x7 = getSorted7x7Windows(matrix);

// console.log("Sorted Matrix:");
// console.log(sortedArrayMatrix3x3)
// Correct rows and cols based on the original matrix
const rows = matrix.length;
const cols = matrix[0].length;

// // Initialize the extractor with the min strategy
const extractor = new MatrixExtractor(getMinMatrix);
// // Extract the minimum matrix
console.log("Minimum Matrix:");
console.log(extractor.extract(sortedArrayMatrix3x3, rows, cols));


extractor.setStrategy(getMedianMatrix);
console.log("Median Matrix:");
console.log(extractor.extract(sortedArrayMatrix3x3, rows, cols));

// // Switch strategy to get the maximum matrix
extractor.setStrategy(getMaxMatrix);
console.log("Maximum Matrix:");
console.log(extractor.extract(sortedArrayMatrix3x3, rows, cols));

