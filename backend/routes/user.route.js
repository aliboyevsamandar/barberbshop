const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require('../middlewares/upload.middleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users and Auth operations
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/", authMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /api/users/register/step1:
 *   post:
 *     summary: Registration – Step 1
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
 *         description: Code sent to email
 *       400:
 *         description: An error occurred
 */
router.post('/register/step1', userController.registerStep1);

/**
 * @swagger
 * /api/users/register/step2:
 *   post:
 *     summary: Registration – Step 2 (code verification)
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
 *         description:  User registered successfully
 *       400:
 *         description: An error occurred
 */
router.post('/register/step2', userController.registerStep2);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login
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
 *         description: Successful login
 *       400:
 *         description: Login error
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users/resetpassword/step1:
 *   post:
 *     summary: Password recovery – Step 1 (send code via email)
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
 *         description: Code sent to email
 *       400:
 *         description: An error occurred
 */
router.post('/resetpassword/step1', userController.resetPasswordStep1);

/**
 * @swagger
 * /api/users/resetpassword/step2:
 *   post:
 *     summary: Password recovery – Step 2 (new password and code)
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
 *         description: Password updated successfully
 *       400:
 *         description: An error occurred
 */
router.post('/resetpassword/step2', userController.resetPasswordStep2);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user (with image)
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
 *         description: User ID
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
 *         description: Updated successfully
 *       400:
 *         description: An error occurred
 */
router.put("/:id", upload.single("image"), authMiddleware, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;