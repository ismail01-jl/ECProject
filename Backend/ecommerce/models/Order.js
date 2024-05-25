const mongoose = require('mongoose');
const Products = require('./Products.js');

const OrderSchema = new mongoose.Schema({
    client: String,
    total: { type: Number, default: 0 },
    status: {
        type: String,
        default: 'Not processed',
        enum: [
            'Not processed',
            'Processing',
            'Shipped',
            'Delivered',
            'Cancelled'
        ]
    },
    lineOrder: [{
        ProductID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Products
        },
        quantity: Number,
        totalPrice: { type: Number, default: 0 }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', OrderSchema);
