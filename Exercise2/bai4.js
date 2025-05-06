// Function này taọ một set từ mảng đầu tiên và sau đó kiểm tra từng phần tử trong mảng thứ hai xem nó có nằm trong set không.
// Nếu không có, ta thêm nó vào mảng kết quả. Điều này giúp ta tìm ra các phần tử trong mảng thứ hai mà không có trong mảng đầu tiên.
// Set là một cấu trúc dữ liệu cho phép ta lưu trữ các giá trị duy nhất và kiểm tra sự tồn tại của chúng một cách nhanh chóng.

function findMissingElements(firstArray, secondArray) {
    const firstSet = new Set(firstArray);
    
    const missingElements = [];
    
    for (const element of secondArray) {
        if (!firstSet.has(element)) {
            missingElements.push(element);
        }
    }
    
    return missingElements;
}

// Example usage
const array1 = [1, 2, 2, 4, 5, 10, 20];
const array2 = [2, 3, 1, 0, 5, 15, 20];
console.log(findMissingElements(array1, array2)); // Should return [0, 15]

// More examples
const nums1 = [4, 8, 15, 16, 23, 42];
const nums2 = [8, 15, 16, 42, 7, 99];
console.log(findMissingElements(nums1, nums2)); // Should return [7, 99]

// More examples
const nums3 = [];
const nums4 = [8, 15, 16, 42, 7, 99];
console.log(findMissingElements(nums3, nums4)); // Should return [ 8, 15, 16, 42, 7, 99 ]

const nums5 = [4, 8, 15, 16, 23, 42];
const nums6 = [];
console.log(findMissingElements(nums5, nums6)); // Should return []
