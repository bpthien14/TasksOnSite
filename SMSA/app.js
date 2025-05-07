const readline = require("readline");
const {
    getStudents,
    displayStudents,
    addStudentToFile,
    addMultipleStudentsToFile,
    findStudentsByName,
    displayFoundStudents,
    displayStatistics,
    loadData,
} = require("./studentManager");

// Tạo interface readline để tương tác với người dùng
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Tải dữ liệu khi khởi động ứng dụng
console.log("Đang tải dữ liệu sinh viên...");
const students = loadData();
console.log(`Đã tải ${students.length} sinh viên từ file.`);

// Hiển thị menu chính
function displayMainMenu() {
    console.log("\n===== QUẢN LÝ SINH VIÊN =====");
    console.log("1. Hiển thị danh sách sinh viên");
    console.log("2. Thêm sinh viên mới");
    console.log("3. Thêm nhiều sinh viên");
    console.log("4. Tìm kiếm sinh viên theo tên");
    console.log("5. Hiển thị thống kê");
    console.log("0. Thoát");
    console.log("=============================");
    rl.question("Vui lòng chọn chức năng (0-5): ", handleMenuChoice);
}

// Xử lý lựa chọn của người dùng
function handleMenuChoice(choice) {
    switch (choice) {
        case "1":
            const allStudents = getStudents();
            displayStudents(allStudents);
            backToMainMenu();
            break;
        case "2":
            addNewStudent();
            break;
        case "3":
            addMultipleStudents();
            break;
        case "4":
            searchStudent();
            break;
        case "5":
            displayStatistics();
            backToMainMenu();
            break;
        case "0":
            console.log(
                "Cảm ơn đã sử dụng ứng dụng quản lý sinh viên. Tạm biệt!"
            );
            rl.close();
            break;
        default:
            console.log("Lựa chọn không hợp lệ. Vui lòng chọn lại.");
            backToMainMenu();
            break;
    }
}

// Hàm quay lại menu chính
function backToMainMenu() {
    rl.question("\nNhấn Enter để quay lại menu chính...", () => {
        displayMainMenu();
    });
}


// Hàm kiểm tra và chuẩn hóa dữ liệu đầu vào
function validateStudentInput() {
    return new Promise((resolve) => {
        rl.question("Nhập tên: ", (name) => {
            // Chuẩn hóa tên
            const normalizedName = name.trim().replace(/\s+/g, ' ');
            
            if (normalizedName.length === 0) {
                console.log("Tên không được để trống.");
                resolve(null);
                return;
            }
            
            rl.question("Nhập tuổi: ", (ageInput) => {
                const age = parseInt(ageInput);
                if (isNaN(age) || age <= 0) {
                    console.log("Tuổi không hợp lệ. Vui lòng nhập một số dương.");
                    resolve(null);
                    return;
                }

                rl.question("Nhập điểm: ", (gradeInput) => {
                    const grade = parseFloat(gradeInput);
                    if (isNaN(grade) || grade < 0 || grade > 10) {
                        console.log("Điểm không hợp lệ. Vui lòng nhập số từ 0-10.");
                        resolve(null);
                        return;
                    }

                    resolve({
                        name: normalizedName,
                        age,
                        grade
                    });
                });
            });
        });
    });
}

// Hàm thêm sinh viên mới
async function addNewStudent() {
    const student = await validateStudentInput();
    if (student) {
        addStudentToFile(student.name, student.age, student.grade);
    }
    backToMainMenu();
}

// Hàm nhập thông tin một sinh viên
function promptStudentInfo(index) {
    console.log(`\n--- Sinh viên thứ ${index} ---`);
    return validateStudentInput();
}

// Hàm thêm nhiều sinh viên
function addMultipleStudents() {
    rl.question("Nhập số lượng sinh viên cần thêm: ", async (countInput) => {
        const count = parseInt(countInput);
        if (isNaN(count) || count <= 0) {
            console.log(
                "Số lượng không hợp lệ. Vui lòng nhập một số nguyên dương."
            );
            backToMainMenu();
            return;
        }

        console.log(`Bạn sẽ thêm ${count} sinh viên.`);
        const studentsList = [];

        for (let i = 1; i <= count; i++) {
            let student = null;
            while (student === null) {
                student = await promptStudentInfo(i);
            }
            studentsList.push(student);
            console.log(`Đã nhập xong thông tin sinh viên thứ ${i}.`);
        }

        addMultipleStudentsToFile(studentsList);
        backToMainMenu();
    });
}

// Hàm tìm kiếm sinh viên
function searchStudent() {
    rl.question("Nhập tên sinh viên cần tìm: ", (name) => {
        searchAndDisplayStudentsByName(name);
        backToMainMenu();
    });
}

// Khởi động ứng dụng
console.log("Chào mừng đến với ứng dụng Quản lý Sinh viên!");
displayMainMenu();
