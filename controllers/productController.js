import Product from "../models/productModel.js"
import filterService from "../services/filterService.js";


const getProducts = async (req, res) => {

  const query = filterService(Product.find({ archived: false }), req.query)

  console.log(req.query);
  try {
    const product = await query
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }

}
const createProducts = async (req, res) => {
  try {
    const product = new Product({ ...req.body, id: Date.now() });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }

}

const editProducts = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedProduct = await Product.findOneAndUpdate({ id: productId }, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }

}

const deleteProducts = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const deletedProduct = await Product.archived({ id: productId });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.send("Product deleted");
  } catch (error) {
    res.status(400).json({ message: error.message })
  }

};

const getCategoryStats = async (req, res) => {
  const stats = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        numProducts: { $sum: 1 },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" }
      }
    },
    {
      $sort: {
        avgPrice: 1
      }
    }
  ])
  res.json(stats)
}

const getPriceStats = async (req, res) => {
  try {
    const priceRange = await Product.aggregate([
    {
      $bucket: {
        groupBy:'$price',
        boundaries: [0, 100, 200, 300],
        default: 'Other',
        output: {
          count: {$sum: 1},
          max: {$max: '$price'},
          min: {$min: '$price'},
          avg: {$avg: '$price'},
        },
      },
    },
    {
      $addFields: {
        range: {
          $switch: {
            branches: [
              {case: {$lt: ['$_id', 100] }, then: '0-100' },
              {case: {$lt: ['$_id', 200] }, then: '100-200' },
              {case: {$lt: ['$_id', 300] }, then: '200-300' },
            ],
            default: '300+',
          }
        }
      },
    }
    ]);

res.json(priceRange)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export { getProducts, createProducts, editProducts, deleteProducts, getCategoryStats, getPriceStats } 