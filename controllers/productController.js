import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    id :{type: Number, required: true, unique:true},
    name :{type: String, required: true},
    price :{type: Number, required: true},
    stock :{type: Number, required: true},
    createdAt :{type: Date, default: Date.now}
})

const Product = mongoose.model("Product", productsSchema)


const getProducts = async (req,res) =>{
    const product = await Product.find({}) 
    res.json(product)
}
const createProducts = async (req,res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  }

  const editProducts = async (req,res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = await Product.findOneAndUpdate({ id: productId }, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  };
// Delete product by ID
const deleteProducts = async (req,res) => {
    const productId = parseInt(req.params.id);
    const deletedProduct = await Product.findOneAndDelete({ id: productId });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.send("Product deleted");
  };

export {getProducts, createProducts, editProducts, deleteProducts} 