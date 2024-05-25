const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');
const auth = require( "../middleware/auth.js"); 


//Gets all the categories
router.get('/', async (req, res) => {
    try {
        const categories = await Categorie.find({}, null, { sort: { '_id': -1 } });
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
//Add new Categorie
router.post('/', async (req, res) => {
    const { nomcategorie, imagecategorie } = req.body
    const newCategorie = new Categorie({ nomcategorie, imagecategorie });
    try {
        await newCategorie.save()
        res.status(200).json({ newCategorie })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
//Delete an categorie by id
router.delete('/:CategorieId', async (req, res) => {
    const id = req.params.CategorieId;
    await Categorie.findByIdAndDelete(id);
    res.json({ message: "categorie deleted successfully." });
});
//Update an categorie by Id 
router.put('/:categorieId', async (req, res) => {
    try {
        const category = await Categorie.findByIdAndUpdate(req.params.categorieId, { $set: req.body }, { new: true });
        res.status(200).json({ category })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
//search categorie by id
router.get('/:categorieId', async (req, res) => {
    try {
        const category = await Categorie.findById(req.params.categorieId);
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
module.exports = router;