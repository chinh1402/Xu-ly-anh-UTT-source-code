
// Example usage
let I = [
    [1, 2, 3, 2],
    [4, 16, 2, 1],
    [4, 2, 25, 1],
    [2, 1, 2, 1]
];

let k = 3;  // Number of closest elements to consider (including the center)

let phi = 2;

function calculateDistance(r1, c1, r2, c2) {
    // Manhattan or Pythagorean distance based on adjacency
    let rowDiff = r2 - r1;
    let colDiff = c2 - c1;
    return Math.sqrt(rowDiff * rowDiff + colDiff * colDiff);
}

function processMatrixWithWindow(I, k) {
    let rows = I.length;
    let cols = I[0].length;

    let allNeighbors = []; // Array to hold all neighbors for each center
    // Iterate through each element in the matrix
    for (let r = 0; r < rows; r++) {
        let rowNeighbors = []; // Neighbors for each row

        for (let c = 0; c < cols; c++) {
            let centerValue = I[r][c];
            let neighbors = [];

            // Add the center element itself with distance 0
            neighbors.push({
                value: centerValue,
                distance: 0,
                difference: 0
            });

            // Define the window bounds (3x3), ensuring we stay within matrix boundaries
            let startRow = Math.max(0, r - 1);
            let endRow = Math.min(rows - 1, r + 1);
            let startCol = Math.max(0, c - 1);
            let endCol = Math.min(cols - 1, c + 1);

            // Iterate over the 3x3 window around the center
            for (let i = startRow; i <= endRow; i++) {
                for (let j = startCol; j <= endCol; j++) {
                    if (i !== r || j !== c) {  // Skip the center itself
                        let distance = calculateDistance(r, c, i, j);
                        neighbors.push({
                            value: I[i][j],
                            distance: distance,
                            difference: Math.abs(centerValue - I[i][j])
                        });
                    }
                }
            }

            // Sort neighbors first by distance, then by value difference
            neighbors.sort((a, b) => {
                if (a.distance !== b.distance) {
                    return a.distance - b.distance;
                } else {
                    return a.difference - b.difference;
                }
            });

            // Take the k closest elements, including the center itself
            let closest = neighbors.slice(0, k).map(neighbor => neighbor.value);

            // Store the closest neighbor values for this center in the current row
            rowNeighbors.push(closest);
        }

        // Add the row's neighbors to the 2D array
        allNeighbors.push(rowNeighbors);
    }

    return allNeighbors;  // Return the 2D array containing neighbor values for each center
}

function calculateAverages(neighbors) {
    // Create a 2D array to store the averages
    let averages = [];

    // Iterate through each row
    for (let row of neighbors) {
        let rowAverages = [];  // Store averages for each row
        
        // Iterate through each list of neighbors in the row
        for (let neighborList of row) {
            // Calculate the sum of the neighbor values
            let sum = neighborList.reduce((acc, val) => acc + val, 0);
            
            // Calculate the average
            let average = sum / neighborList.length;
            
            // Store the average for this list of neighbors
            rowAverages.push(average);
        }
        
        // Add the row's averages to the 2D array
        averages.push(rowAverages);
    }

    return averages;
}

function calculateAbsoluteDifferences(matrix, averages) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    let result = [];

    for (let r = 0; r < rows; r++) {
        let rowResult = [];
        for (let c = 0; c < cols; c++) {
            let centerValue = matrix[r][c];
            let averageValue = averages[r][c];
            let absoluteDifference = Math.abs(centerValue - averageValue);
            rowResult.push(absoluteDifference);
        }
        result.push(rowResult);
    }

    return result;
}

function processMatrixWithPhi(matrix, averages, differences, phi) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    let result = [];

    for (let r = 0; r < rows; r++) {
        let rowResult = [];
        for (let c = 0; c < cols; c++) {
            let centerValue = matrix[r][c];
            let averageValue = averages[r][c];
            let differenceValue = differences[r][c];

            // Choose between centerValue and averageValue based on difference and phi
            let selectedValue = differenceValue <= phi ? centerValue : Math.round(averageValue);
            rowResult.push(selectedValue);
        }
        result.push(rowResult);
    }

    return result;
}

let neighbors = processMatrixWithWindow(I, k);
console.log('Giá trị lân cận cho mỗi trung tâm cửa sổ:', neighbors);

let averages = calculateAverages(neighbors);
console.log('Giá trị trung bình cho một trung tâm cửa số:', averages);

let differences = calculateAbsoluteDifferences(I, averages);
console.log('Abs(I(P) - Avg(P)):', differences);

let finalValues = processMatrixWithPhi(I, averages, differences, phi);
console.log('Giá trị cuối cùng sau khi so sánh với Phi:', finalValues);
