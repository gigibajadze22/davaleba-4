import express from 'express'
import { getProducts, createProducts, editProducts, deleteProducts,getCategoryStats,getPriceStats } from '../controllers/productController.js'
const productsRouter = express.Router()


productsRouter.route('/').get(getProducts).post(createProducts)
productsRouter.route('/:id').put(editProducts).delete(deleteProducts)
productsRouter.route("/stats").get(getCategoryStats)
productsRouter.route("/price-stats").get(getPriceStats)
export default productsRouter