const express = require('express')
const studentRouter = express.Router()

const students = [
    {name: 'Nguyen Minh Duc', age: 20, id: 1},
    {name: 'Dang Van Cuong', age: 20, id: 2},
    {name: 'Nguyen Dac Dat', age: 20, id: 3}
]

studentRouter.get('/', (req, res) => {
    res.json(students)
})

studentRouter.get('/add', (req, res) => {
    students.push ({name: 'Dang Hoang Anh', age: 20})
    res.json(students)
})

studentRouter.get('/:id', (req, res) => {
    const idFind = req.params.id 
    const findStudent = students.find((students) => students.id === parseInt(idFind))

    if(findStudent){
        res.json(findStudent)
    }
    else{
        res.send('Threre is not any student that have id you find!')
    }
})



module.exports = studentRouter