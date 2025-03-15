import Product from "../models/productModel.js"

const getProducts = async (req,res) =>{
  const excludeFields = ['sort','fields','page','limit']
  const queryObj = {...req.query}

  console.log(req.query);
  try{
  let query = Product.find() 
 excludeFields.forEach(el =>delete queryObj[el])
    query = query.find(queryObj) 
   if(req.query.sort) query = query.sort(req.query.sort)
   if(req.query.fields) query= query.select(req.query.fields.split(',').join(' '))


    const page = req.query.page * 1 || 1
    const limit = req.query.limit *1 ||100
    const skip = (page-1) * limit
    query = query.skip(skip).limit(limit)


    const product = await query
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