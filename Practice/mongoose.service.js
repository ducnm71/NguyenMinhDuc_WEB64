const mongoose = require('mongoose')
let count = 0

const connectWithRetry = () => {
    mongoose.connect('mongodb+srv://sa:sa@cluster0.krx6pfc.mongodb.net/NewFacebook?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDB is connected');
    }).catch(err => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds!', ++count);
        setTimeout(connectWithRetry, 5000)
    } )
}

connectWithRetry()

exports.mongoose = mongoose