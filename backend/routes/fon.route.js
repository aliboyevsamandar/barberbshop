const express = require("express");
const router = express.Router();
const fonController = require("../controllers/fon.controller");
const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Fons
 *   description: Background (fon) rasmlarni boshqarish
 */

/**
 * @swagger
 * /api/fons:
 *   get:
 *     summary: Barcha background rasmlarni olish
 *     description: Ushbu endpoint barcha fon rasmlarni olish uchun ishlatiladi.
 *     tags: [Fons]
 *     responses:
 *       200:
 *         description: Fonlar muvaffaqiyatli olindi
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
 *                     example: Gray background
 *                   image:
 *                     type: string
 *                     example: https://yourdomain.com/uploads/gray.jpg
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */
router.get("/", fonController.getAllFons);

/**
 * @swagger
 * /api/fons:
 *   post:
 *     summary: Yangi fon rasmini qo'shish
 *     description: Authenticated user fon rasm va nomini yuklaydi.
 *     tags: [Fons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dark theme background
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Yangi fon rasm muvaffaqiyatli qo‘shildi
 *       400:
 *         description: Rasm yuklanmadi yoki noto‘g‘ri format
 */
router.post("/", authMiddleware, upload.single("image"), fonController.createFon);

/**
 * @swagger
 * /api/fons/{id}:
 *   put:
 *     summary: Fon rasm va nomini yangilash
 *     description: Faqat token orqali kirgan foydalanuvchi fonni tahrirlashi mumkin.
 *     tags: [Fons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Tahrir qilinadigan fon IDsi
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Light mode
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Fon muvaffaqiyatli yangilandi
 *       404:
 *         description: Ko‘rsatilgan ID bo‘yicha fon topilmadi
 */
router.put("/:id", authMiddleware, upload.single("image"), fonController.updateFon);

/**
 * @swagger
 * /api/fons/{id}:
 *   delete:
 *     summary: Fon rasmni o‘chirish
 *     description: Auth bo‘lgan foydalanuvchi fonni ID bo‘yicha o‘chira oladi.
 *     tags: [Fons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: O‘chiriladigan fon IDsi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fon muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Fon topilmadi
 */
router.delete("/:id", authMiddleware, fonController.deleteFon);

module.exports = router;
