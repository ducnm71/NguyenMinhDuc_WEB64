const mongoose = require('mongoose')

const connectdatabase = async () => {
    try{
        const dbconfig = 'mongo"//localhost/fullstack-web'
        const connect = await mongoose.connect(dbconfig)
        console.log(`MongoDb is connected: ${connect.connection.host}`);
    }catch(e){
        console.log('Error in connection');
    }
}

module.exports = connectdatabase