const mongoose = require('mongoose')
const Categorie = require('./Categorie.js') 
const ScategorieSchema = mongoose.Schema({
    nomscategorie: { type: String, required: true },
    categorieID: {type: mongoose.Schema.Types.ObjectId,ref: Categorie}
})
module.exports = mongoose.model('Scategorie', ScategorieSchema)