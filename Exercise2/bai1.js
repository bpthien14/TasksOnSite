function factorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }
    
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

function combination(n, k) {
    // Xử lí các trường hợp đặc biệt
    if (k < 0 || k > n) {
        return 0;
    }
    
    if (k === 0 || k === n) {
        return 1;
    }
    
    // Sưa đổi k nếu lớn hơn n-k vì tổ hợp có tính chất đối xứng
    if (k > n - k) {
        k = n - k;
    }
    
    // Calculate combination
    return factorial(n) / (factorial(k) * factorial(n - k));
}

// Example usage
console.log(combination(5, 2)); // test thường 
console.log(combination(50, 26)); // Test xử lí số lớn - Kq: 121548660036299.98
console.log(combination(50, 25)); // Test xử lí số lớn - Kq: 126410606437752
console.log(combination(50, 24)); // Test xử lí số lớn - Kq: 121548660036299.98
console.log(combination(50, 23)); // Test xử lí số lớn - Kq: 108043253365599.98
console.log(combination(50, 22)); // Test xử lí số lớn - Kq: 88749815264600

// Kết luận: Function tính combination trên không thể xử lí chính xác các số lớn vì một vài lí do:

// - Giới hạn của kiểu Number trong JavaScript: JavaScript chỉ có thể biểu diễn chính xác các số nguyên đến 2^53-1 (Number.MAX_SAFE_INTEGER, tức 9,007,199,254,740,991). Giai thừa tăng rất nhanh - 21! đã vượt quá giới hạn này.

// - Vấn đề tràn số: Hàm factorial sẽ trả về giá trị Infinity cho các số đầu vào lớn hơn 170.

// - Độ chính xác khi chia: Ngay cả khi các giai thừa riêng lẻ nằm trong phạm vi cho phép, phép chia có thể làm mất độ chính xác

function optimizeCombination(n, k) {
    // Xử lí các trường hợp đặc biệt
    if (k < 0 || k > n) {
        return 0;
    }
    
    if (k === 0 || k === n) {
        return 1;
    }
    
    // Tối ưu bằng cách sử dụng giá trị k nhỏ hơn
    if (k > n - k) {
        k = n - k;
    }
    
    // Tính C(n,k) sử dụng công thức nhân
    // C(n,k) = (n * (n-1) * ... * (n-k+1)) / (k * (k-1) * ... * 1)
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result = result * (n - k + i) / i;
    }
    
    return Math.round(result); // Làm tròn để xử lí lỗi dấu phẩy động
}

// Example usage
console.log(optimizeCombination(5, 2)); // test thường 
console.log(optimizeCombination(50, 26)); // Test xử lí số lớn - Kq: 121548660036300
console.log(optimizeCombination(50, 25)); // Test xử lí số lớn - Kq: 126410606437752
console.log(optimizeCombination(50, 24)); // Test xử lí số lớn - Kq: 121548660036300
console.log(optimizeCombination(50, 23)); // Test xử lí số lớn - Kq: 108043253365600
console.log(optimizeCombination(50, 22)); // Test xử lí số lớn - Kq: 88749815264600
console.log(optimizeCombination(100, 20)); // Test xử lí số lớn - Kq: 535983370403809600000
