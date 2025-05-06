// Hàm tạo ra số ngẫu nhiên trong khoảng từ min đến max (Vì Hàm random trong JS tạo ra số ngẫu nhiên trong khoảng [0, 1) 
// nên ta cần nhân với (max - min) và cộng với min để đưa về khoảng mong muốn)
function getRandomNumber(min, max) {
    // Ensure min and max are numbers
    min = Number(min);
    max = Number(max);
    
    // Swap if min is greater than max
    if (min > max) {
        [min, max] = [max, min];
    }
    
    // Calculate random number between min and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage
console.log(getRandomNumber(1, 1000)); // Random number between 1 and 10
console.log(getRandomNumber(50, 100)); // Random number between 50 and 100
console.log(getRandomNumber(-10, 10)); // Random number between -10 and 10