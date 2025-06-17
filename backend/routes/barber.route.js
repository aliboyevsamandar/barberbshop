const express = require("express");
const router = express.Router();
const {
  createBarber,
  getAllBarbers,
  getBarberById,
  updateBarber,
  deleteBarber,
} = require("../controllers/barber.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

/**
 * @swagger
 * tags:
 *   name: Barbers
 *   description: Barber CRUD operations
 */

/**
 * @swagger
 * /api/barbers:
 *   post:
 *     summary:Add a new barber
 *     tags: [Barbers]
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
 *               - age
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ali Barber
 *               age:
 *                 type: number
 *                 example: 30
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: A new barber has been created
 *       400:
 *         description: No image uploaded
 */
router.post("/", upload.single("image"), authMiddleware, createBarber);

/**
 * @swagger
 * /api/barbers:
 *   get:
 *     summary: Get all barbers
 *     tags: [Barbers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of barbers
 */
router.get("/", authMiddleware, getAllBarbers);
/**
 * @swagger
 * /api/barbers/{id}:
 *   put:
 *     summary: Update a barber
 *     tags: [Barbers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Barber ID
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
 *               age:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description:  Barber updated successfully
 *       404:
 *         description: Barber not found
 */
router.put("/:id", upload.single("image"), authMiddleware, updateBarber);

/**
 * @swagger
 * /api/barbers/{id}:
 *   delete:
 *     summary: Delete a barber
 *     tags: [Barbers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Barber ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Barber deleted successfully
 *       404:
 *         description: Barber not found
 */
router.delete("/:id", authMiddleware, deleteBarber);

module.exports = router;