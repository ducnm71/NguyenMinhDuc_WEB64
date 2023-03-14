const express = require('express')
const app = express()
const port = 3000

const studentRouter = require('./students')

app.use('/student', studentRouter)

// app.get('/user/:id', (req,res)=> {

//     console.log(req.params);
//     res.send('this is my website')
// })

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})