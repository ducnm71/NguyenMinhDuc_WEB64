const useModule = require('./createModule.js')

const result = useModule.getBirthday(2003,1,7)
const myBirthday = new Date(result)
const d = myBirthday.getDate()
const m = myBirthday.getMonth()+1
const y = myBirthday.getFullYear()

console.log(`My birthday is ${d}-${m}-${y}`);