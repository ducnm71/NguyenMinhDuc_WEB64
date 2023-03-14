var express = require('express');
var router = express.Router();
const { getProducts,
    getProductById,
    deleteProductById,
    createProduct } = require('../controller/productController');

const {protect, isAdmin} = require('../middleware/authMiddleware') 
// API 1 - get product
// @desc: Get all products
// @route: GET /api/products
// @access: Public
router.get('/', getProducts)
router.get('/:id',getProductById)
router.delete('/:id',protect,isAdmin,deleteProductById)
router.post('/', protect,isAdmin,createProduct)

// API 2
module.exports = router;