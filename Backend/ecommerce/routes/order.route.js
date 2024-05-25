const express = require('express');
const router = express.Router();
const Order = require('../models/order.js');
//Add new order
router.post('/', async (req, res) => {
    const commandeData = req.body;
    try {
        const mtcmd = commandeData.lineOrder.reduce((acc, lc) => acc + lc.totalPrice, 0);
        const newOrder = new Order({
            client: commandeData.client,
            total: parseFloat(mtcmd).toFixed(3),
            status: 'Not processed',
            lineOrder: commandeData.lineOrder.map((lc) => ({
                ProductID: lc.ProductID,
                quantity: lc.quantity,
                totalPrice: lc.totalPrice
            })),
        });
        await newOrder.save();
        res.status(200).json({ message: 'sucess', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(409).json({ message: error.message });
    }
});
// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}, null, { sort: { '_id': -1 } }).populate('lineOrder.ProductID').exec();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('lineOrder.articleID');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Update an order
router.put('/:id', async (req, res) => {
    const newStatus = req.body.status; 
    if (!['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(newStatus)) {
        res.status(403).json({ message: 'Invalid status value' }); return;
    }
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;