
// Example usage
const image = [
  [5, 5, 3, 2],
  [8, 3, 5, 5],
  [5, 2, 3, 9],
  [9, 3, 5, 3],
];

const kernel = [
  [1,1,1],
  [1,-8,1],
  [1,1,1],
];

let multiplier = 1;

function convolution2D(image, kernel, multiplier = 1) {
  const imageHeight = image.length;
  const imageWidth = image[0].length;
  const kernelHeight = kernel.length;
  const kernelWidth = kernel[0].length;
  const output = [];
  const cleanOutput = [];

  // Calculate padding size
  const padHeight = Math.floor(kernelHeight / 2);
  const padWidth = Math.floor(kernelWidth / 2);

  // Initialize output and cleanOutput matrices with zeros
  for (let i = 0; i < imageHeight; i++) {
    output[i] = new Array(imageWidth).fill(0);
    cleanOutput[i] = new Array(imageWidth).fill(0); // Initialize cleanOutput as well
  }

  // Apply the convolution operation
  for (let i = 0; i < imageHeight; i++) {
    for (let j = 0; j < imageWidth; j++) {
      let sum = 0;
      // Loop through the kernel
      for (let m = 0; m < kernelHeight; m++) {
        for (let n = 0; n < kernelWidth; n++) {
          // Calculate the coordinates of the image pixel corresponding to the kernel element
          const x = i + m - padHeight;
          const y = j + n - padWidth;

          // Check if the coordinates are within the bounds of the image
          if (x >= 0 && x < imageHeight && y >= 0 && y < imageWidth) {
            sum += image[x][y] * kernel[m][n];
          }
        }
      }
      output[i][j] = (sum * multiplier).toFixed(2); // Keep 2 decimal places
      let normalizedValue = sum * multiplier;
      if (sum * multiplier > 255) {
        normalizedValue = 255;
      }
      if (sum * multiplier < 0) {
        normalizedValue = 0;
      }
      cleanOutput[i][j] = Math.round(normalizedValue); // Rounded to nearest integer
    }
  }
  return { output, cleanOutput };
}

const { output, cleanOutput } = convolution2D(image, kernel, multiplier);
console.log("Ket qua chua lam tron");
console.log(output);
console.log("Ket qua da lam tron");
console.log(cleanOutput);
