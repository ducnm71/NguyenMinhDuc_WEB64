const arr = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 10]

const newArr = Array.from(new Set(arr)).filter(item => item%2==0)

console.log(newArr);