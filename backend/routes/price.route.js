const express = require("express");
const router = express.Router();
const PriceController = require("../controllers/price.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Prices
 *   description: Working with prices
 */

/**
 * @swagger
 * /api/prices:
 *   post:
 *     summary: Add a new price
 *     tags: [Prices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Getting a haircut
 *               price:
 *                 type: number
 *                 example: 30000
 *     responses:
 *       201:
 *         description: A new price has been added
 *       400:
 *         description: Invalid data
 */
router.post("/", authMiddleware, PriceController.createPrice);

/**
 * @swagger
 * /api/prices:
 *   get:
 *     summary: Get all prices
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: A list of prices
 */
router.get("/", PriceController.getAllPrices);

/**
 * @swagger
 * /api/prices/{id}:
 *   put:
 *     summary: Update a price
 *     tags: [Prices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Price ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hair Removal (Updated)
 *               price:
 *                 type: number
 *                 example: 35000
 *     responses:
 *       200:
 *         description: Price updated successfully
 *       404:
 *         description: Price not found
 *       400:
 *         description: An error occurred
 */
router.put("/:id", authMiddleware, PriceController.updatePrice);

/**
 * @swagger
 * /api/prices/{id}:
 *   delete:
 *     summary: Delete a price
 *     tags: [Prices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Price ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Price deleted successfully
 *       404:
 *         description: Price not found
 */
router.delete("/:id", authMiddleware, PriceController.deletePrice);

module.exports = router;