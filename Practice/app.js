const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
const mongoose = require('./mongoose.service').mongoose

const routes = require('./routes.config')

app.use(express.json())
routes.routesConfig(app)


app.listen(3000,() => {
    console.log(`Server is running on port:`, 3000);            
})