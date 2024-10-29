// Answer đúng, nhưng k ra được bảng phân tích
function lzwDecode(compressed) {
    // Tạo từ điển khởi đầu với các ký tự đơn
    const dictionary = new Map();
    let dictSize = 258; // Bắt đầu từ mã 258 cho các chuỗi mới

    // Thêm các ký tự ASCII vào từ điển
    for (let i = 0; i < 256; i++) {
        dictionary.set(i, String.fromCharCode(i));
    }

    // Lấy mã đầu tiên từ chuỗi đã nén và chuyển thành ký tự
    let w = dictionary.get(compressed[0]);
    let result = w; // Khởi tạo chuỗi kết quả

    // In tiêu đề bảng
    console.log("Old | Input | Word(O+I) | Code | Out");
    console.log(`-   | ${w}     | ${w}         | ${compressed[0]}   | -`);

    // Duyệt qua các mã còn lại trong chuỗi đã nén
    for (let i = 1; i < compressed.length; i++) {
        let k = compressed[i];
        let entry = "";
        let wordOI = "";

        // Kiểm tra xem mã k có trong từ điển hay không
        if (dictionary.has(k)) {
            entry = dictionary.get(k);
        } else if (k === dictSize) {
            entry = w + w[0];
        } else {
            throw new Error("Mã không hợp lệ trong quá trình giải mã: " + k);
        }

        wordOI = w + entry[0];  // Word (O+I)

        // Xác định giá trị của `out` từ `compressed[i-1]`
        let outValue = "";
        if (dictionary.has(compressed[i - 1])) {
            outValue = dictionary.get(compressed[i - 1]);  // Lấy giá trị từ từ điển
        } else if (compressed[i - 1] < 256) {
            outValue = String.fromCharCode(compressed[i - 1]);  // Chuyển thành ký tự ASCII
        } else {
            outValue = "-";  // Đánh dấu là mã không xác định
        }

        console.log(`${w}   | ${entry[0]}     | ${wordOI}         | ${dictSize}  | ${outValue}`);

        result += entry;

        // Thêm chuỗi mới vào từ điển
        dictionary.set(dictSize++, wordOI);

        // Cập nhật w
        w = entry;
    }

    // Xác định giá trị `out` cho bước cuối cùng
    let finalOutValue = "";
    if (dictionary.has(compressed[compressed.length - 1])) {
        finalOutValue = dictionary.get(compressed[compressed.length - 1]);
    } else if (compressed[compressed.length - 1] < 256) {
        finalOutValue = String.fromCharCode(compressed[compressed.length - 1]);
    } else {
        finalOutValue = "?";
    }

    // In bước cuối cùng
    console.log(`${w}   | -     | -           | ${dictSize}  | ${finalOutValue}`);

    return result;
}

const compressed = [
    65,66,67,259,258,67,262,68 
 ]

const decompressed = lzwDecode(compressed);
console.log("Chuỗi sau giải mã:", decompressed);

console.log(decompressed.length)