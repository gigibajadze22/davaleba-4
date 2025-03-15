import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: [true, "Name is Required"] },
    price: { type: Number, required: true, validate: {validator: (val) => val >0, message: "price must be greater than 0" }},
    stock: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productsSchema);


export default Product