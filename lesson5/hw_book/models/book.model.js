const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: String,
    author: String,
    publication_date: String,
    pages: Number,
    genres: [String],
    publisher: {
        name: String,
        location: String
    }

})

module.exports = mongoose.model('Book', bookSchema)