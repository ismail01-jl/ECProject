const express = require('express');
const router = express.Router();
const product = require("../models/Products")
const Scategorie = require("../models/SCategorie")

// Display the list of products
router.get('/', async (req, res) => {
    try {
        const products = await product.find({}, null, { sort: { '_id': -1 } }).populate('SCategorie').exec();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new product
router.post('/', async (req, res) => {
    const newProduct = new product(req.body);
    try {
        const response = await newProduct.save();
        const producte = await product.findById(response._id).populate('SCategorie').exec();
        res.status(200).json(producte);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get a specific product by ID
router.get('/:productId', async (req, res) => {
    try {
        const producte = await product.findById(req.params.productId).populate('SCategorie').exec();
        res.status(200).json(producte);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Update a product
router.put('/:productId', async (req, res) => {
    try {
        const producte = await product.findByIdAndUpdate(req.params.productId, { $set: req.body }, { new: true }).populate('SCategorie').exec();
        res.status(200).json(producte);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Delete a product
router.delete('/:productId', async (req, res) => {
    try {
        await product.findByIdAndDelete(req.params.productId);
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Search for products by sub-category
router.get('/scat/:scategorieID', async (req, res) => {
    try {
        const products = await product.find({ SCategorie: req.params.scategorieID }).populate('SCategorie').exec();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Search for products by category
router.get('/cat/:categorieID', async (req, res) => {
    try {
        const subCategories = await Scategorie.find({ categorieID: req.params.categorieID }).exec();
        const subCategoryIDs = subCategories.map(subCategory => subCategory._id);
        const products = await product.find({ SCategorie: { $in: subCategoryIDs } }).populate('SCategorie').exec();

        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/paginationFilter', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page
    const limit = parseInt(req.query.limit) || 5; // Number of items per page
    const searchTerm = req.query.searchTerm || ""; // searchedTerm

    const offset = (page - 1) * limit;

    try {
        let query = {};
        if (searchTerm) {
            query = { designation: { $regex: new RegExp(searchTerm, 'i') } };
        }
        const totalProducts = await product.find(query).countDocuments();
        const products = await product.find(query)
            .sort({ '_id': -1 } )
            .skip(offset)
            .limit(limit)

        res.status(200).json({ products: products, total: totalProducts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
module.exports = router;