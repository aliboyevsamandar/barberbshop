const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/service.controller");
const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Services department
 */

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Add a new service
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
 *                 example: Getting a haircut
 *               description:
 *                 type: string
 *                 example: Professional hair cutting service
 *               price:
 *                 type: number
 *                 example: 50000
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: An error occurred
 */
router.post("/", authMiddleware, upload.single("image"), ServiceController.createService);

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: A list of services
 */
router.get("/", ServiceController.getAllServices);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Service ID
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
 *                 example: Getting a haircut
 *               description:
 *                 type: string
 *                 example: Updated service
 *               price:
 *                 type: number
 *                 example: 60000
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated successfully
 *       400:
 *         description: An error occurred
 *       404:
 *         description: Service not found
 */
router.put("/:id", authMiddleware, upload.single("image"), ServiceController.updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Service ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Service not found
 */
router.delete("/:id", authMiddleware, ServiceController.deleteService);

module.exports = router;