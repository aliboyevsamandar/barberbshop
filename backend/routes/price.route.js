const express = require("express");
const router = express.Router();
const PriceController = require("../controllers/price.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Prices
 *   description: Xizmatlar narxlarini boshqarish
 */

/**
 * @swagger
 * /api/prices:
 *   post:
 *     summary: Yangi narx qo‘shish
 *     description: Foydalanuvchi (token bilan) yangi xizmat va uning narxini qo‘shadi.
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
 *                 example: Soch olish
 *               price:
 *                 type: number
 *                 example: 30000
 *     responses:
 *       201:
 *         description: Yangi narx muvaffaqiyatli qo‘shildi
 *       400:
 *         description: Noto‘g‘ri ma'lumot yuborildi
 */
router.post("/", authMiddleware, PriceController.createPrice);

/**
 * @swagger
 * /api/prices:
 *   get:
 *     summary: Barcha narxlarni olish
 *     description: Tizimdagi barcha xizmat narxlarini ro‘yxatini olish.
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: Narxlar muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                     example: Soch olish
 *                   price:
 *                     type: number
 *                     example: 30000
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */
router.get("/", PriceController.getAllPrices);

/**
 * @swagger
 * /api/prices/{id}:
 *   put:
 *     summary: Narxni yangilash
 *     description: Foydalanuvchi (token bilan) mavjud xizmat narxini yangilaydi.
 *     tags: [Prices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Yangilanadigan narx IDsi
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
 *                 example: Soch olish (Yangilangan)
 *               price:
 *                 type: number
 *                 example: 35000
 *     responses:
 *       200:
 *         description: Narx muvaffaqiyatli yangilandi
 *       404:
 *         description: Narx topilmadi
 *       400:
 *         description: Noto‘g‘ri ma'lumot
 */
router.put("/:id", authMiddleware, PriceController.updatePrice);

/**
 * @swagger
 * /api/prices/{id}:
 *   delete:
 *     summary: Narxni o‘chirish
 *     description: Foydalanuvchi (token bilan) narxni ID orqali o‘chiradi.
 *     tags: [Prices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O‘chiriladigan narx IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Narx muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Narx topilmadi
 */
router.delete("/:id", authMiddleware, PriceController.deletePrice);

module.exports = router;
