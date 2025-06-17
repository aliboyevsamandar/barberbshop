const express = require("express");
const router = express.Router();
const {
  createBarber,
  getAllBarbers,
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
 *     summary: Add a new barber
 *     tags: [Barbers]
 *     description: Creates a new barber with name, age, and image.
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
 *         description: Invalid input or no image uploaded
 */
router.post("/", upload.single("image"), authMiddleware, createBarber);

/**
 * @swagger
 * /api/barbers:
 *   get:
 *     summary: Get all barbers
 *     tags: [Barbers]
 *     description: Returns a list of all barbers.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of barbers
 */
router.get("/", authMiddleware, getAllBarbers);

/**
 * @swagger
 * /api/barbers/{id}:
 *   put:
 *     summary: Update a barber
 *     tags: [Barbers]
 *     description: Updates name, age, or image of a barber.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Barber ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Name
 *               age:
 *                 type: number
 *                 example: 35
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Barber updated
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
 *     description: Deletes a barber by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Barber ID
 *     responses:
 *       200:
 *         description: Barber deleted successfully
 *       404:
 *         description: Barber not found
 */
router.delete("/:id", authMiddleware, deleteBarber);

module.exports = router;