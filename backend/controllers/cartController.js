const Cart = require('../models/Cart');

// Add item to cart
const addItemToCart = async (req, res) => {
    const { productId, qty } = req.body;

    try {
        const existingCart = await Cart.findOne({ user: req.userId });

        if (existingCart) {
            const existingItem = existingCart.items.find(item => item.product.toString() === productId);
            if (existingItem) {
                existingItem.qty += qty;
            } else {
                existingCart.items.push({ product: productId, qty });
            }
            await existingCart.save();
            return res.status(200).json(existingCart);
        } else {
            const newCart = new Cart({ user: req.userId, items: [{ product: productId, qty }] });
            await newCart.save();
            res.status(201).json(newCart);
        }
    } catch (err) {
        res.status(500).json({ message: 'Error adding item to cart' });
    }
};

// Get cart items
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const total = cart.items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
        res.status(200).json({ cart, total });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === req.params.id);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Error removing item from cart' });
    }
};

module.exports = { addItemToCart, getCart, removeItemFromCart };
