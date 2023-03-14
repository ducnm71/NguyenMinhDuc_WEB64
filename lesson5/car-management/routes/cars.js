const express = require('express')
const carRouter = express.Router()
const carModel = require('../model/car.model')
//create - tao 1 api tao 1 xe moi luu vao db

carRouter.post('/', (req,res) => {
    const car = new carModel()
    car.name = req.body.name
    car.manufacturer = req.body.manufacturer
    car.price = req.body.price

    car.save((err, car) => {
        if(err){
            res.send('Loi luu thong tin xe nay')
        }else{
            console.log('Luu thanh cong xe', car);
            res.send(car)
        }
    })
})

//read
carRouter.get('/', (req, res) => {
    carModel.find({name: req.query.name}).exec((err, cars) => {
        if(err) {
            res.send('Khong tim thay!')
        }else{
            console.log('Lay thanh cong');
            res.json(cars)
        }
    })
})

carRouter.get('/:id', (req, res) => {
    carModel.findOne(
    {
        _id: req.params.id
    }).exec((err, car) => {
        if(err) {
            res.send('Co loi xay ra')
        } else {
            console.log('Lay thanh cong');
            res.json(car)
        }
    })
})

carRouter.put('/:id', (req,res) => {
    carModel.findOneAndUpdate(
        {
            _id: req.params.id
        }, 
        {
            $set: {name: req.body.name,
                    manufacturer: req.body.manufacturer,
                    price: req.body.price}
        },
        {
            upsert: true
        },
        (err, car) => {
            if(err) {
                res.send('Co loi xay ra')
            } else {
                res.json(car)
            }
        }
    )
})

carRouter.delete('/:id', (req,res) => {
    carModel.findByIdAndDelete(
        {
            _id: req.params.id
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

module.exports = carRouter 