// Cây có thể khác do cách dựng cây

class Node {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

// Hàm để tạo cây Huffman
function buildHuffmanTree(freq) {
    const nodes = Object.entries(freq).map(([char, frequency]) => new Node(char, frequency));
    
    while (nodes.length > 1) {
        // Sắp xếp các nút theo tần suất
        nodes.sort((a, b) => a.freq - b.freq);
        
        // Lấy hai nút có tần suất thấp nhất
        const left = nodes.shift();
        const right = nodes.shift();
        
        // Tạo nút mới với tần suất tổng
        const newNode = new Node(null, left.freq + right.freq);
        newNode.left = left;
        newNode.right = right;
        
        // Thêm nút mới vào danh sách
        nodes.push(newNode);
    }
    
    return nodes[0]; // Trả về gốc của cây
}

// Hàm để tạo mã từ cây Huffman
function generateHuffmanCodes(node, prefix = '', codeMap = {}) {
    if (node) {
        if (node.char) {
            codeMap[node.char] = prefix; // Gán mã cho ký tự
        }
        generateHuffmanCodes(node.left, prefix + '0', codeMap);
        generateHuffmanCodes(node.right, prefix + '1', codeMap);
    }
    return codeMap;
}

// Hàm để in cây Huffman dưới dạng ASCII
function printHuffmanTree(node, prefix = '') {
    if (node) {
        if (node.char) {
            console.log(`${prefix}${node.char} (${node.freq})`);
        } else {
            console.log(`${prefix}* (${node.freq})`);
        }
        printHuffmanTree(node.left, prefix + '--');
        printHuffmanTree(node.right, prefix + '--');
    }
}

// Hàm in tần suất ký tự
function printFrequencies(freq) {
    console.log("Tần suất xuất hiện của các ký tự:");
    for (const [char, frequency] of Object.entries(freq)) {
        console.log(`${char}: ${frequency}`);
    }
}

// Hàm mã hóa chuỗi
function huffmanEncode(str) {
    // Tính tần suất ký tự
    const freq = {};
    for (const char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    // In tần suất ký tự
    printFrequencies(freq);
    
    // Xây dựng cây Huffman
    const huffmanTree = buildHuffmanTree(freq);
    
    // Tạo mã Huffman
    const huffmanCodes = generateHuffmanCodes(huffmanTree);
    
    // Mã hóa chuỗi
    let encodedString = '';
    for (const char of str) {
        encodedString += huffmanCodes[char];
    }
    
    // In cây Huffman
    console.log("Cây Huffman:");
    printHuffmanTree(huffmanTree);

    return { encodedString, huffmanCodes, freq };
}

function calculateCompressedSize(huffmanCodes, freq) {
    let compressedSize = 0;

    // Duyệt qua từng ký tự trong mã Huffman
    for (const [char, code] of Object.entries(huffmanCodes)) {
        const bitLength = code.length; // Số bit của ký tự
        const charFrequency = freq[char]; // Tần suất của ký tự
        compressedSize += bitLength * charFrequency; // Nhân số bit với tần suất và cộng dồn
    }

    return compressedSize;
}

// Sử dụng hàm
const input = "CHUYENNGANHCONGNGHETHONGTIN";
const { encodedString, huffmanCodes, freq } = huffmanEncode(input);

console.log("Mã Huffman:", huffmanCodes);

const size = input.length * 8;

console.log("Kích thước trước nén:", size, "bits");

const compressedSize = calculateCompressedSize(huffmanCodes, freq);
console.log("Kích thước sau nén:", compressedSize, "bits");

const tile = parseFloat(size) / parseFloat(compressedSize);
console.log("tỉ lệ nén: ",tile)

const doduthua = 1 - 1/parseFloat(tile)
console.log("do du thua:",doduthua)