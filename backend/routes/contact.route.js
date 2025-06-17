const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Manage user contact messages (create, read)
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Add a new contact message
 *     description: Authenticated users can submit a contact form message.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 message:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Phone number or message is missing
 *       401:
 *         description: Unauthorized (No token provided)
 */
router.post("/", authMiddleware, ContactController.createContact);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contact messages
 *     description: Returns all contact messages sent by users.
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
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", ContactController.getAllContacts);

module.exports = router;
