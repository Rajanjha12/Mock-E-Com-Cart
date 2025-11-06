const express = require('express');
const { addItemToCart, getCart, removeItemFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addItemToCart);
router.get('/', authMiddleware, getCart);
router.delete('/:id', authMiddleware, removeItemFromCart);

module.exports = router;
