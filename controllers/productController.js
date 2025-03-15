import Product from "../models/productModel.js"

const getProducts = async (req,res) =>{
  try{
    const product = await Product.find({name:'Product 4'}) 
  res.json(product)
  }catch(error) {
    res.status(400).json({message: error.message})
  }
  
}
const createProducts = async (req,res) => {
try{
   const product = new Product({...req.body, id: Date.now()});
  await product.save();
  res.status(201).json(product);
}catch(error) {
  res.status(400).json({message: error.message})
}

}

const editProducts = async (req,res) => {
  try{
    const productId = parseInt(req.params.id);
  const updatedProduct = await Product.findOneAndUpdate({ id: productId }, req.body, { new: true });
  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(updatedProduct);
}catch(error) {
  res.status(400).json({message: error.message})
}

  }
  

const deleteProducts = async (req,res) => {
  try{
    const productId = parseInt(req.params.id);
  const deletedProduct = await Product.findOneAndDelete({ id: productId });
  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.send("Product deleted");
  }catch(error) {
    res.status(400).json({message: error.message})
  }
  
};

export {getProducts, createProducts, editProducts, deleteProducts} 