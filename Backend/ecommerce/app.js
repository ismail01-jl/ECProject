const express = require('express');
//const router = express.Router(); 
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

const categorieRouter = require("./routes/categorie.route")
app.use('/api/categories', categorieRouter);
const scategorieRouter = require("./routes/scategorie.route")
app.use('/api/scategories', scategorieRouter);
const productRouter = require("./routes/products.route")
app.use('/api/products', productRouter);
const userRouter = require("./routes/user.route")
app.use('/api/users', userRouter);
const orderRouter = require("./routes/order.route")
app.use('/api/orders', orderRouter);

// data base connecting
mongoose.connect(process.env.DATABASE)
    .then(() => { console.log("DataBase Successfully Connected"); })
    .catch(err => {
        console.log("Unable to connect to database", err);
        process.exit();
    });
// requête 
app.get("/", (req, res) => {
    res.send("hello si ismail");
});
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
module.exports = app;

