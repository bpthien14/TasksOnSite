class Student {
    constructor(id, name, age, grade) {
        this.id = id;
        this.name = name.trim();
        this.age = age;
        this.grade = grade;
    }

    // Các phương thức để làm việc với sinh viên
    getClassification() {
        if (this.grade >= 8) return 'Xuất sắc';
        if (this.grade >= 6.5) return 'Giỏi';
        return 'Trung bình';
    }

    // Kiểm tra tính hợp lệ
    static validate(data) {
        const errors = [];
        
        if (!data.name || data.name.trim() === '') 
            errors.push('Tên không được để trống');
            
        if (isNaN(data.age) || data.age <= 0) 
            errors.push('Tuổi phải là số dương');
            
        if (isNaN(data.grade) || data.grade < 0 || data.grade > 10) 
            errors.push('Điểm phải nằm trong khoảng 0-10');
            
        return errors;
    }

}

module.exports = Student;