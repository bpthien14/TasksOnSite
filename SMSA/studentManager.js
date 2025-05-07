const fs = require("fs");
const path = require("path");
const Student = require("./models/Student.module");

// Lấy đường dẫn tuyệt đối đến file data.json
const DATA_PATH = path.join(__dirname, "data.json");

function loadData() {
    try {
        // Kiểm tra xem file có tồn tại không, https://nodejs.org/api/fs.html#fsexistssyncpath
        // exists có Sync ở đuôi để kiểm tra đồng bộ và không cần callback
        if (!fs.existsSync(DATA_PATH)) {
            // Nếu file không tồn tại, tạo file với mảng rỗng, https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options
            // writeFile có Sync ở đuôi để ghi đồng bộ và không cần callback
            fs.writeFileSync(DATA_PATH, "[]", "utf8");
            return [];
        }

        const data = fs.readFileSync(DATA_PATH, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
}

function saveData(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(DATA_PATH, jsonData, "utf8");
        return true;
    } catch (error) {
        console.error("Error writing file:", error);
        return false;
    }
}

function getStudents() {
    return loadData();
}

// Function to generate a unique ID for a new student
function generateStudentId(students) {
    return students.length > 0
        ? Math.max(...students.map((student) => student.id)) + 1
        : 1;
}

function addStudentToFile(name, age, grade) {
    const data = { name, age, grade };
    const errors = Student.validate(data);

    if (errors.length > 0) {
        console.log("Lỗi:", errors.join(", "));
        return false;
    }

    let students = getStudents();
    const id = generateStudentId(students);
    const newStudent = new Student(id, name, age, grade);

    students.push(newStudent);
    if (saveData(students)) console.log("New student added:", newStudent);
    return true;
}

function addMultipleStudentsToFile(studentsList) {
    let students = getStudents();

    // Thêm từng sinh viên với ID riêng biệt
    const newStudents = [];
    let errorsFound = false;

    studentsList.forEach((data) => {
        // Đảm bảo rằng tên được trim trước khi validate
        if (data.name) {
            data.name = data.name.trim().replace(/\s+/g, " "); // Thay thế nhiều khoảng trắng bằng một khoảng trắng
        }

        const errors = Student.validate(data);

        if (errors.length > 0) {
            console.log(
                `Lỗi khi thêm sinh viên ${data.name}:`,
                errors.join(", ")
            );
            errorsFound = true;
        } else {
            const id = generateStudentId(students);
            const newStudent = new Student(id, data.name, data.age, data.grade);
            students.push(newStudent);
            newStudents.push(newStudent);
        }
    });

    // Chỉ lưu nếu không có lỗi
    if (newStudents.length > 0) {
        if (saveData(students))
            console.log(
                `Đã thêm ${newStudents.length} sinh viên vào hệ thống.`
            );
    } else if (errorsFound) {
        console.log(
            "Không có sinh viên nào được thêm vào hệ thống do lỗi dữ liệu."
        );
    }

    return newStudents;
}

function displayStudents(students) {
    console.log("List of students:");
    students.forEach((student) => {
        console.log(
            `ID: ${student.id}, Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`
        );
    });
}

function displayTheListOfStudents() {
    const students = getStudents();
    displayStudents(students);
    return students;
}

function findStudentsByName(name) {
    const students = loadData();
    return students.filter((student) =>
        student.name.toLowerCase().includes(name.toLowerCase())
    );
}

function displayFoundStudents(foundStudents) {
    if (foundStudents.length > 0) {
        displayStudents(foundStudents);
    } else {
        console.log("No students found with that name.");
    }
}

function searchAndDisplayStudentsByName(name) {
    const foundStudents = findStudentsByName(name);
    displayFoundStudents(foundStudents);
    return foundStudents;
}

// Hàm tính tổng số sinh viên
function getTotalStudents() {
    const students = getStudents();
    return students.length;
}

// Hàm tính điểm trung bình của tất cả sinh viên
function getAverageGrade() {
    const students = getStudents();
    if (students.length === 0) return 0;

    const totalGrade = students.reduce(
        (sum, student) => sum + student.grade,
        0
    );
    return (totalGrade / students.length).toFixed(2);
}

// Hàm phân loại sinh viên
function getStudentClassification() {
    const students = getStudents();
    const classification = {
        excellent: 0, // ≥ 8
        good: 0, // ≥ 6.5 và < 8
        average: 0, // < 6.5
    };

    students.forEach((student) => {
        if (student.grade >= 8) {
            classification.excellent++;
        } else if (student.grade >= 6.5 && student.grade < 8) {
            classification.good++;
        } else {
            classification.average++;
        }
    });

    return classification;
}

// Hàm lấy toàn bộ thống kê
function getStatistics() {
    return {
        totalStudents: getTotalStudents(),
        averageGrade: getAverageGrade(),
        classification: getStudentClassification(),
    };
}

// Hàm hiển thị thống kê
function displayStatistics() {
    const stats = getStatistics();
    console.log("\n===== THỐNG KÊ SINH VIÊN =====");
    console.log(`Tổng số sinh viên: ${stats.totalStudents}`);
    console.log(`Điểm trung bình: ${stats.averageGrade}`);
    console.log("Phân loại sinh viên:");
    console.log(
        `  - Xuất sắc (≥ 8): ${stats.classification.excellent} sinh viên`
    );
    console.log(`  - Giỏi (≥ 6.5): ${stats.classification.good} sinh viên`);
    console.log(
        `  - Trung bình (< 6.5): ${stats.classification.average} sinh viên`
    );
    console.log("===============================\n");

    return stats;
}

module.exports = {
    loadData,
    saveData,
    addStudentToFile,
    addMultipleStudentsToFile,
    getStudents,
    displayStudents,
    displayTheListOfStudents,
    findStudentsByName,
    displayFoundStudents,
    searchAndDisplayStudentsByName,
    getTotalStudents,
    getAverageGrade,
    getStudentClassification,
    getStatistics,
    displayStatistics,
};
