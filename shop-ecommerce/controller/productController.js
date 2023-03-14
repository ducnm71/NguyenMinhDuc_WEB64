const asyncHandle = require('express-async-handler');
const productModel = require('../models/productModel');

// Search theo keyword truyen len
// Phan trang -> tra ve so luong record tren 1 trang la 10
// Skip den dung record ma user yeu cau
const getProducts = asyncHandle(async (req, res) => {
    // Fix so luong item hien thi tren 1 trang
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword;
    const searchQuery = keyword ? { name: { $regex: keyword } } : {};
    // Count theo cung 1 dieu kien -> Tim ra so luong total record tra ve
    const totalProduct = await productModel.countDocuments({ ...searchQuery });
    // Gia su co 20 san pham, dang o trang so 2 -> skip qua 10 san pham dau tien, chi lay tu san pham so 11 tro di
    const products = await productModel.find({ ...searchQuery }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({
        products,
        totalProduct,
        page
    });
});

const getProductById = asyncHandle(async(req,res) => {
    const product = await productModel.findById(req.params._id)
    if(!product){
        res.status(400)
        throw new Error('Id invalid')
        return
    }
    res.status(200).json(product)
})

const deleteProductById = asyncHandle(async(req,res) => {
    try{
        await productModel.deleteOne(req.params.id)
        res.status(200).send('Delete successfully')

    }
    catch(e) {
        res.status(400)
        throw new Error('Can not delete')
    }

})

const createProduct = asyncHandle(async(req,res) =>{
    await productModel.insertOne({
        user: req.body.user,
        name: req.body.name,
        image: req.body.image
    })
})

module.exports = {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct
}