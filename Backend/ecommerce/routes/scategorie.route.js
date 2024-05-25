const express = require('express');
const router = express.Router();
const SCategorie = require('../models/SCategorie');

//Gets all the Sous categories
router.get('/', async (req, res,) => {
    try {
        const scat = await SCategorie.find({}, null, {sort: {'_id': -1}}).populate("categorieID")
        res.status(200).json(scat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
//Add new Sous Categorie
router.post('/', async (req, res) => {
    const { nomscategorie,categorieID } = req.body;
    const newSCategorie = new SCategorie({
        nomscategorie: nomscategorie,
        categorieID: categorieID
    })
    try {
        await newSCategorie.save();
        res.status(200).json(newSCategorie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    16
});
//search Scategorie by id
router.get('/:scategorieId',async(req, res)=>{ 
    try { 
    const scat = await SCategorie.findById(req.params.scategorieId); 
    
    res.status(200).json(scat); 
    } catch (error) { 
    res.status(404).json({ message: error.message }); 
    } 
}); 
//update Scategorie by id
router.put('/:scategorieId', async (req, res) => {
    try {
        const scat = await SCategorie.findByIdAndUpdate( req.params.scategorieId,  { $set: req.body }, { new: true } );
        res.status(200).json(scat);
    } catch (error) {
            res.status(404).json({ message: error.message });
    }
});
//delete Scategorie by id
router.delete('/:scategorieId', async (req, res) => {
    const id = req.params.scategorieId; 
    await SCategorie.findByIdAndDelete(id); 
    res.json({ message: "sous categorie deleted successfully." });
});
// search sous categorie par categorie 
router.get('/cat/:categorieID',async(req, res)=>{ 
    try { 
    const scat = await SCategorie.find({ categorieID:req.params.categorieID}).exec(); 
    res.status(200).json(scat); 
    } catch (error) { 
    res.status(404).json({ message: error.message }); 
    } 
});
module.exports = router;