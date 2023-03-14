// Nhiem vu: Import or clean data hang loat - batch
const ProductModel = require('./models/productModel');
const UserModel = require('./models/userModel');
const productsFake = require('./data/product');

const connectDB = require('./config/database');

connectDB();

const importData = async () => {
    try {
        // Xu ly logic import data from json to database
        const userAdmin = await UserModel.findOne({ email: 'anh.nguyen@yahoo.com.vn' });
        const sampleData = productsFake.map((product) => {
            return {
                ...product,
                user: userAdmin._id
            }
        });
        await ProductModel.insertMany(sampleData);
        console.log('Data imported success !!!');
    } catch (e) {
        console.log(e);
        console.log('Data imported failed !!!');
    }
}

importData();