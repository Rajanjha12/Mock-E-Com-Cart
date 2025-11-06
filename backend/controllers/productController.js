

const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

// Create a new product
const postProduct = async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    
    if (!name || !price || !description || !imageUrl) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newProduct = new Product({
            name,
            price,
            description,
            imageUrl
        });

        
        await newProduct.save();
        res.status(201).json(newProduct); 
    } catch (err) {
        res.status(500).json({ message: 'Error saving product' });
    }
};

module.exports = { getProducts, postProduct };
