const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Manage contacts
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Add a new contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - message
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               message:
 *                 type: string
 *                 example: "Hello! I enjoyed your services."
 *     responses:
 *       201:
 *         description: A new contact has been created  
 *       400:
 *         description: Phone number or message is missing
 */
router.post("/", authMiddleware, ContactController.createContact);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   message:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */
router.get("/", ContactController.getAllContacts);

module.exports = router;
