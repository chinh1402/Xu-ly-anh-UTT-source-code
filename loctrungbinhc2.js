// cach 2: lay gia tri bien = 0

// Ma trận ảnh I (4x4)
let I = [
    [10, 41, 9, 3, 123],
    [232, 186, 79, 21, 134],
    [1, 43, 56, 1, 12],
    [88, 98, 34, 4, 2],
    [134, 76, 89, 104, 5],
    [88, 54, 12, 231, 1],
    [74, 12, 42, 111, 0],
    
];

let phi = 80; // Giá trị phi

// Hàm lấy giá trị an toàn từ ma trận I (padding 0 ngoài biên)
function getValue(I, x, y) {
    if (x >= 0 && x < I.length && y >= 0 && y < I[0].length) {
        return I[x][y];
    }
    return 0; // Trả về 0 nếu nằm ngoài biên
}

// Hàm tính lọc trung bình 3x3
function meanFilter(I, phi) {
    let rows = I.length;
    let cols = I[0].length;

    // Tạo một ma trận kết quả để lưu kết quả sau khi lọc
    let result = [];

    for (let i = 0; i < rows; i++) {
        result[i] = [];
        for (let j = 0; j < cols; j++) {
            let sum = 0;
            let count = 0;

            // Duyệt qua cửa sổ 3x3 xung quanh điểm I[i][j]
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    sum += getValue(I, i + k, j + l);
                    count++;
                }
            }

            let avg = sum / count;
            let value = Math.abs(I[i][j] - avg)

            let actualValue = 0

            console.log(`avg at I[${i}][${j}]=${avg}`)

            value <= phi ? actualValue = I[i][j] : actualValue = avg
            result[i][j] = Math.round(actualValue);
            
        }
    }

    return result;
}

// Gọi hàm lọc trung bình
let filteredImage = meanFilter(I, phi);

// In kết quả
console.log("Ảnh sau khi lọc:");
filteredImage.forEach(row => {
    console.log(row);
});
