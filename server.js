const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();

app.use(bodyParse.json());
mongoose.connect("mongodb+srv://khalid:k123456k@cluster0.3ubin.mongodb.net/twitter?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const Product = mongoose.model("products", new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    image: String,
    title: String,
    description: String,
    price: Number,
    availableSizes: [String]
}));
app.get("/api/products", async (req, res) => {
    const products = await Product.find();
    res.send(products);
});
app.post("/api/products", async (req, res) => {
    const newProducts = new Product(req.body);
    const products = await newProducts.save();
    res.send(products);
});
app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});
app.listen(4000, () => {
    console.log("server is running");
});