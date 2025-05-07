class Student {
    constructor(id, name, age, grade) {
        this.id = id;
        this.name = name.trim();
        this.age = age;
        this.grade = grade;
    }

    getClassification() {
        if (this.grade >= 8) return "Xuất sắc";
        if (this.grade >= 6.5) return "Giỏi";
        return "Trung bình";
    }

    // Kiểm tra tính hợp lệ
    static validate(data) {
        const errors = [];
        const nameRegex =
            /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

        if (!data.name || data.name.trim() === "")
            errors.push("Tên không được để trống");
        
        // Kiểm tra dấu câu và ký tự đặc biệt
        if (!nameRegex.test(data.name)) {
            errors.push(
                "Tên chỉ được chứa chữ cái và khoảng trắng, không được chứa dấu câu hoặc ký tự đặc biệt."
            );
        }
        if (isNaN(data.age) || data.age <= 0)
            errors.push("Tuổi phải là số dương");

        if (isNaN(data.grade) || data.grade < 0 || data.grade > 10)
            errors.push("Điểm phải nằm trong khoảng 0-10");

        return errors;
    }
}

module.exports = Student;
