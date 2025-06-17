const express = require("express");
const router = express.Router();
const fonController = require("../controllers/fon.controller");
const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Fons
 *   description: Working with background images
 */

/**
 * @swagger
 * /api/fons:
 *   get:
 *     summary: Get all background images
 *     tags: [Fons]
 *     responses:
 *       200:
 *         description: A list of background images
 */
router.get("/", fonController.getAllFons);

/**
 * @swagger
 * /api/fons:
 *   post:
 *     summary: Add a new background image
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
 *                 example: Gray background
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: A new background image has been created
 *       400:
 *         description: No image uploaded
 */
router.post("/", authMiddleware, upload.single("image"), fonController.createFon);

/**
 * @swagger
 * /api/fons/{id}:
 *   put:
 *     summary: Update background image information
 *     tags: [Fons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Fon ID
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
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: background changed
 *       404:
 *         description: Background not found
 */
router.put("/:id", authMiddleware, upload.single("image"), fonController.updateFon);

/**
 * @swagger
 * /api/fons/{id}:
 *   delete:
 *     summary: Delete a background image
 *     tags: [Fons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Fon ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Background deleted successfully
 *       404:
 *         description: Background not found
 */
router.delete("/:id", authMiddleware, fonController.deleteFon);

module.exports = router;