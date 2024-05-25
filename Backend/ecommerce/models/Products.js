const mongoose = require ("mongoose");
const SCategorie =require("./SCategorie.js"); 
const productsSchema =mongoose.Schema({
    name:{ type: String, required: true,unique:true },
    price:{ type: Number, required: true },
    description:{ type: String, required: true },
    image:{ type: String, required: true },
    SCategorie:{type:mongoose.Schema.Types.ObjectId , ref:SCategorie}   
})
module.exports=mongoose.model('Products',productsSchema)