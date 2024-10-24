function lzwEncode(input) {
    // Tạo từ điển khởi đầu với các ký tự đơn
    const dictionary = new Map();
    let dictSize = 258;  // Bắt đầu từ mã 258 cho các chuỗi mới

    // Thêm các mã ASCII từ 0-255 cho các ký tự đơn
    for (let i = 0; i < 256; i++) {
        dictionary.set(String.fromCharCode(i), i);
    }

    let w = '';  // Old bắt đầu là chuỗi rỗng
    const result = [];

    // In tiêu đề bảng
    console.log("Old | Input | Word(O+I) | Code | Out");

    // Xử lý riêng cho ký tự đầu tiên
    const firstChar = input[0];  // Ký tự đầu tiên
    console.log(`-   | ${firstChar}     | ${firstChar}         | ${dictionary.get(firstChar)}   | -`);
    w = firstChar;  // Đặt w thành ký tự đầu tiên

    // Duyệt qua phần còn lại của chuỗi
    for (let i = 1; i < input.length; i++) {
        const c = input[i];  // Ký tự hiện tại (Input)
        const wc = w + c;    // Kết hợp Old và Input thành Word (O+I)

        // Nếu wc đã có trong từ điển, vẫn in ra bảng để theo dõi quá trình
        if (dictionary.has(wc)) {
            const oldCode = dictionary.get(w);  // Mã của Old
            const inputCode = dictionary.get(c);  // Mã của Input
            console.log(`${w}   | ${c}     | ${wc}         | -    | -`);
            w = wc;  // Cập nhật w thành wc
        } else {
            // Nếu wc chưa có trong từ điển, thêm wc và in bảng
            const oldCode = dictionary.get(w);  // Mã của Old
            console.log(`${w}   | ${c}     | ${wc}         | ${dictSize}  | ${oldCode}`);

            // Thêm mã của w vào kết quả
            result.push(dictionary.get(w));

            // Thêm wc vào từ điển với mã mới
            dictionary.set(wc, dictSize++);
            w = c; // Đặt w thành ký tự hiện tại (Input)
        }
    }

    // Thêm bước cuối cùng nếu còn giá trị trong w
    if (w !== '') {
        const oldCode = dictionary.get(w);
        console.log(`${w}   | -     | -           | ${dictSize}  | ${oldCode}`);
        result.push(dictionary.get(w));
    }

    return result;
}

function calculateCompressionRatio(codes) {
    let totalBitsCompressed = 0; // Tổng số bit sau khi nén

    codes.forEach(code => {
        if (code > 256) {
            totalBitsCompressed += 9; // Sử dụng 9 bits cho mã lớn hơn 256
        } else {
            totalBitsCompressed += 8; // Sử dụng 8 bits cho mã <= 256
        }
    });

    // Tính tỉ lệ nén
    return totalBitsCompressed
}

const input = "ABACBAACBAADABBABC";
const compressed = lzwEncode(input);
console.log("Chuỗi sau mã hóa:", compressed);

let size = input.length * 8;

let bitCompressed = calculateCompressionRatio(compressed)

const tilenen = size / bitCompressed;
console.log("ti le nen:", tilenen)

const doduthua = 1 - 1/tilenen
console.log("do du thua:", doduthua)