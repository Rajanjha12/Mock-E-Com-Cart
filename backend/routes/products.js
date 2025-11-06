
const express = require('express');
const { getProducts, postProduct } = require('../controllers/productController');
const router = express.Router();

// Get all products
router.get('/products', getProducts);

// Post a new product
router.post('/products', postProduct);

module.exports = router;
