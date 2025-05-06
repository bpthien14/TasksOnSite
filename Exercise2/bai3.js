function getRandomElement(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return undefined;
    }
    
    const randomIndex = Math.floor(Math.random() * array.length);
    
    return array[randomIndex];
}

// Example usage
const fruits = ['apple', 'banana', 'orange', 'grape', 'mango'];
console.log(getRandomElement(fruits)); // Random fruit from the array

const numbers = [10, 20, 30, '123', 50];

console.log(getRandomElement(numbers)); // Random number from the array

console.log(getRandomElement([])); // undefined (empty array)