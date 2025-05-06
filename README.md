# BigInt là gì ? 
- BigInt là một kiểu dữ liệu trong JS để biểu diễn các số nguyên lớn
- Sinh ra để giải quyết giới hạn của Number.
## Cú pháp: 
    // Cách khai báo
    const bigNumber = 9007199254740991n; // Thêm 'n' vào cuối
    const anotherBig = BigInt("9007199254740991"); // Dùng constructor

    // Các phép tính
    const sum = bigNumber + BigInt(10); // 9007199254741001n
    const product = bigNumber * 2n; // 18014398509481982n

    // So sánh
    console.log(1n < 2); // true
    console.log(2n > 1); // true
    console.log(1n == 1); // true (loose equality)
    console.log(1n === 1); // false (strict equality - khác kiểu)
## Lưu trữ: 
    BigInts: Lưu trữ dưới dạng chuỗi các chữ số trong không gian bộ nhớ được cấp phát động.
    Còn Numbers: Lưu trữ dưới dạng số thực dấu phẩy động độ chính xác kép IEEE-754 (64 bit)

## Triển khai: 
    Trong V8 (Chrome/Node.js):

        Biểu Diễn Nội Bộ: 
            BigInts được lưu trữ dưới dạng:
                Một bit dấu
                Một mảng chữ số có độ dài thay đổi (thường là các khối 32-bit hoặc 64-bit)
        Quản Lý Bộ Nhớ:
            BigInts là các đối tượng được cấp phát trên heap
            Engine thay đổi kích thước bộ nhớ một cách động khi cần thiết cho các phép tính
## Bên trong xử lí phép toán
// Ví dụ phép cộng (biểu diễn khái niệm)
function bigIntAdd(a, b) {
// 1. Chuyển đổi thành biểu diễn mảng chữ số nội bộ
// 2. Thực hiện thuật toán cộng cơ bản với nhớ
// 3. Chuẩn hóa kết quả (loại bỏ số 0 đứng đầu)
// 4. Tạo đối tượng BigInt mới với kết quả
}
## Hiệu suất

- Các phép toán BigInt chậm hơn phép toán Number
- Hiệu suất phụ thuộc vào số lượng chữ số (O(n) hoặc O(n²) cho phép nhân)


# IEEE-754
IEEE-754 là một tiêu chuẩn kỹ thuật về số học dấu phẩy động (floating-point) được thiết lập bởi Viện Kỹ sư Điện và Điện tử (IEEE) vào năm 1985 và sau đó được cập nhật vào năm 2008 và 2019.

## Cấu trúc của số dấu phẩy động 64-bit (Double Precision)
Một số được lưu trữ trong 64 bit, chia thành 3 phần:

1 bit dấu: Xác định số là dương (0) hay âm (1)
11 bit số mũ (exponent): Biểu diễn phạm vi của số
52 bit phần định trị (mantissa/significand): Biểu diễn độ chính xác của số

## Cách Biểu Diễn Số
Số dấu phẩy động 64-bit (double precision) biểu diễn theo công thức:
Giá trị = (-1)^sign × 2^(exponent-1023) × (1.mantissa)

Ví dụ biểu diễn số 42.5:

Chuyển sang nhị phân: 101010.1
Chuẩn hóa: 1.010101 × 2^5
Sign bit: 0 (số dương)
Exponent: 1028 (1023 + 5) → 10000000101 nhị phân
Mantissa: 010101... (lưu phần sau dấu phẩy)


# Khi object B là một property trong object A và thực hiện destructuring object B:

## Destructuring Không Tạo Bản Sao Mới
Khi thực hiện destructuring, JavaScript không tạo ra bản sao mới của object, mà chỉ tạo ra biến mới trỏ đến cùng vùng nhớ:

const objectA = {
  property1: 'value1',
  objectB: {
    nestedProperty: 'nestedValue'
  }
};

// Destructuring
const { objectB } = objectA;

// Thay đổi qua biến mới
objectB.nestedProperty = 'changedValue';

// Kiểm tra
console.log(objectA.objectB.nestedProperty); // 'changedValue'
console.log(objectB === objectA.objectB);    // true - cùng 

- Giải Thích:
    Cấu trúc bộ nhớ:

        objectA chứa một reference đến object gốc
        Thuộc tính objectB của objectA chứa reference đến object lồng nhau

    Khi destructuring:

        JavaScript tìm thuộc tính objectB trong objectA
        Tạo biến mới objectB với cùng giá trị reference
        Không có object mới nào được tạo ra




