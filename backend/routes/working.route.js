const express = require("express");
const router = express.Router();
const WorkingController = require("../controllers/working.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: WorkingDays
 *   description: Barberlarning ish kunlari bilan bog‘liq amallar
 */

/**
 * @swagger
 * /api/working:
 *   post:
 *     summary: Yangi ish kunini qo‘shish
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
 *         description: Ish kuni muvaffaqiyatli qo‘shildi
 *       400:
 *         description: Xatolik yuz berdi
 */
router.post("/", authMiddleware, WorkingController.createWorkingDay);

/**
 * @swagger
 * /api/working:
 *   get:
 *     summary: Barcha ish kunlarini olish
 *     tags: [WorkingDays]
 *     responses:
 *       200:
 *         description: Ish kunlari ro‘yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/", WorkingController.getAllWorkingDays);

/**
 * @swagger
 * /api/working/{id}:
 *   put:
 *     summary: ID orqali ish kunini yangilash
 *     tags: [WorkingDays]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ish kuni IDsi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               isClosed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli yangilandi
 *       404:
 *         description: Topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/:id", authMiddleware, WorkingController.updateWorkingDay);

/**
 * @swagger
 * /api/working/{id}:
 *   delete:
 *     summary: Ish kunini o‘chirish
 *     tags: [WorkingDays]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ish kuni IDsi
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/:id", authMiddleware, WorkingController.deleteWorkingDay);

module.exports = router;
