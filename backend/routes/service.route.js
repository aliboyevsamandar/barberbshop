const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/service.controller");
const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Xizmatlar bo‘limi (qo‘shish, yangilash, o‘chirish, olish)
 */

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Yangi xizmat qo‘shish
 *     description: Admin yoki autentifikatsiyadan o‘tgan foydalanuvchi yangi xizmat qo‘shadi. Rasm ham yuklanadi.
 *     tags: [Services]
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
 *               - description
 *               - price
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Soch olish
 *               description:
 *                 type: string
 *                 example: Professional soch olish xizmati
 *               price:
 *                 type: number
 *                 example: 50000
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Xizmat muvaffaqiyatli qo‘shildi
 *       400:
 *         description: Noto‘g‘ri ma'lumot yuborildi
 */
router.post("/", authMiddleware, upload.single("image"), ServiceController.createService);

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Barcha xizmatlarni olish
 *     description: Foydalanuvchilar barcha mavjud xizmatlar ro‘yxatini olishadi.
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Xizmatlar muvaffaqiyatli olindi
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
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   image:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */
router.get("/", ServiceController.getAllServices);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Xizmatni yangilash
 *     description: Admin mavjud xizmatni tahrirlaydi (nomi, narxi, tavsifi va rasmi).
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Xizmat IDsi
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Soch olish (yangilangan)
 *               description:
 *                 type: string
 *                 example: Yangilangan xizmat tavsifi
 *               price:
 *                 type: number
 *                 example: 60000
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Xizmat muvaffaqiyatli yangilandi
 *       400:
 *         description: Noto‘g‘ri ma'lumot yuborildi
 *       404:
 *         description: Xizmat topilmadi
 */
router.put("/:id", authMiddleware, upload.single("image"), ServiceController.updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Xizmatni o‘chirish
 *     description: Admin xizmatni bazadan o‘chiradi.
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O‘chiriladigan xizmat IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xizmat muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Xizmat topilmadi
 */
router.delete("/:id", authMiddleware, ServiceController.deleteService);

module.exports = router;
