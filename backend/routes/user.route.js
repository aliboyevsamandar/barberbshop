const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require('../middlewares/upload.middleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchilar va autentifikatsiya amallari
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati
 */
router.get("/", authMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /api/users/register/step1:
 *   post:
 *     summary: Ro'yxatdan o'tish – 1-bosqich (emailga kod yuborish)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Emailga kod yuborildi
 *       400:
 *         description: Xatolik yuz berdi
 */
router.post('/register/step1', userController.registerStep1);

/**
 * @swagger
 * /api/users/register/step2:
 *   post:
 *     summary: Ro'yxatdan o'tish – 2-bosqich (kodni tasdiqlash)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *       400:
 *         description: Kod noto'g'ri yoki boshqa xatolik
 */
router.post('/register/step2', userController.registerStep2);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Tizimga kirish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kirish muvaffaqiyatli amalga oshdi (token qaytariladi)
 *       400:
 *         description: Login xatoliklari
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users/resetpassword/step1:
 *   post:
 *     summary: Parol tiklash – 1-bosqich (emailga kod yuborish)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kod emailga yuborildi
 *       400:
 *         description: Xatolik yuz berdi
 */
router.post('/resetpassword/step1', userController.resetPasswordStep1);

/**
 * @swagger
 * /api/users/resetpassword/step2:
 *   post:
 *     summary: Parol tiklash – 2-bosqich (yangi parol va kod kiritish)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Parol muvaffaqiyatli yangilandi
 *       400:
 *         description: Kod noto'g'ri yoki boshqa xatolik
 */
router.post('/resetpassword/step2', userController.resetPasswordStep2);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash (rasm bilan)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Foydalanuvchi IDsi
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foydalanuvchi yangilandi
 *       400:
 *         description: Yangilashda xatolik yuz berdi
 */
router.put("/:id", upload.single("image"), authMiddleware, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Foydalanuvchi IDsi
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o'chirildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 */
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;