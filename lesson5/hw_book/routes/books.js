const express = require('express')
const bookRouter = express.Router()
const bookModel = require('../models/book.model')
const bodyParser = require('body-parser')


//1.Tim toan bo sach
bookRouter.get('/', (req, res) => {
    bookModel.find({}).exec((err, books) => {
        if(err){
            res.send('Khong tim thay')
        } else{
            console.log('Lay thanh cong');
            res.json(books)
        }
    })
})

//2.Tim sach theo id
bookRouter.get('/:id', (req, res) => {
    bookModel.findOne(
        { _id: req.params.id }
    ).exec((err, book) => {
        if(err){
            res.send('Khong tim thay')
        } else{
            console.log('Lay thanh cong');
            res.json(book)
        }
    })
})


//3.Them mot sach moi
bookRouter.post('/', (req,res) => {
    const book = new bookModel()
    book.title = req.body.title
    book.author = req.body.author
    book.publication_date = req.body.publication_date
    book.pages = req.body.pages
    book.genres = req.body.genres
    book.publisher = req.body.publisher

    book.save((err, book) => {
        if(err){
            res.send('Loi luu thong tin sach nay')
        } else {
            console.log('Luu thanh cong sach', book);
            res.send(book)
        }
    })
})

//4.Tim 1 sach cos lon hon 400 trang va dung 2 the loai
bookRouter.get('/', (req, res) => {
    // pages = req.query.pages
    bookModel.findOne({pages: {$gt:400}, 
        genres: {$size:2}
    })
    .exec((err, book) => {
        if(err) {
            res.send('Khong tim thay sach')
        } else {
            console.log('Lay thanh cong');
            res.json(book)
        }
    })
})


bookRouter.get('/', (req, res) => {
    
    bookModel.findOne({title: req.query.title}).exec((err, books) => {
        if(err){
            res.send('Khong tim thay')
        } else{
            console.log('Lay thanh cong');
            res.json(books)
        }
    })
})

//5.Update thong tin sach co title 'One Hundred Years Of Solitude'
bookRouter.put('/', (req, res) => {
    bookModel.findOneAndUpdate(
        {
            title: req.query.title
        },
        {
            $set: {
                publication_date: req.body.publication_date,
                genres: req.body.genres,
                publisher: req.body.publisher
            }
        },
        {
            upsert: true
        },
        (err, book) => {
            if(err) {
                res.send('Co loi xay ra')
            } else {
                console.log('Cap nhat thanh cong');
                res.json(book)
            }
        }
    )
})

//6.Delete sach xuat ban truoc 1967
bookRouter.delete('', (req, res) =>{
    year = req.query.publication_date
    bookModel.deleteMany(
        {
            year: {$lt: 1967}
        },
        {},
        (err) => {
            if(err) {
                res.send('Co loi xay ra')
            } else {
                res.status(200).send('Xoa thanh cong')
            }
        }
    )
})



module.exports = bookRouter