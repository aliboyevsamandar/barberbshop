const express = require("express");
const router = express.Router();
const WorkingController = require("../controllers/working.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: WorkingDays
 *   description: Working days (for barbers)
 */

/**
 * @swagger
 * /api/working:
 *   post:
 *     summary: Add a new working day
 *     tags: [WorkingDays]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - day
 *             properties:
 *               day:
 *                 type: string
 *                 example: Monday
 *               startTime:
 *                 type: string
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 example: "18:00"
 *               isClosed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: An error occurred
 */
router.post("/", authMiddleware, WorkingController.createWorkingDay);

/**
 * @swagger
 * /api/working:
 *   get:
 *     summary: Get all working days
 *     tags: [WorkingDays]
 *     responses:
 *       200:
 *         description: A list of working days
 *       500:
 *         description: Server error
 */
router.get("/", WorkingController.getAllWorkingDays);

/**
 * @swagger
 * /api/working/{id}:
 *   get:
 *     summary: Get a working day by ID
 *     tags: [WorkingDays]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Working day ID
 *     responses:
 *       200:
 *         description: Found
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, WorkingController.updateWorkingDay);

/**
 * @swagger
 * /api/working/{id}:
 *   delete:
 *     summary: Delete a working day
 *     tags: [WorkingDays]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Working day ID
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleware, WorkingController.deleteWorkingDay);

module.exports = router;