/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         category:
 *           type: string
 *           description: The category of the product
 * 
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       "200":
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       "201":
 *         description: Product created successfully
 * /product/{id}:
 *   put:
 *     summary: Edit an existing product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       "200":
 *         description: Product updated successfully
 *   delete:
 *     summary: Delete an existing product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Product deleted successfully
 * 
 * /product/stats:
 *   get:
 *     summary: Get category statistics
 *     tags: [Products]
 *     responses:
 *       "200":
 *         description: Category statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: string
 *                   description: The category name
 *                 count:
 *                   type: number
 *                   description: The count of products in the category
 * 
 * /product/price-stats:
 *   get:
 *     summary: Get price statistics
 *     tags: [Products]
 *     responses:
 *       "200":
 *         description: Price statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                   description: The price range
 *                 count:
 *                   type: number
 *                   description: The count of products in this price range
 */
