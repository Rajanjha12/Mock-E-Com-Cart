// Mock checkout process (no real payment)
const checkout = async (req, res) => {
    const { cartItems } = req.body;

    try {
        const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
        const receipt = {
            total,
            timestamp: new Date(),
            cartItems
        };
        res.status(200).json(receipt);
    } catch (err) {
        res.status(500).json({ message: 'Error during checkout' });
    }
};

module.exports = { checkout };
