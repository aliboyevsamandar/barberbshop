const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Manage user comments (Create, Read, Update, Delete)
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     description: Returns a list of all user comments.
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   text:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", CommentController.getAllComments);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add a new comment
 *     description: Authenticated users can add a new comment.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: "This is a really great barber!"
 *     responses:
 *       201:
 *         description: A new comment has been added
 *       400:
 *         description: Comment text is required
 */
router.post("/", authMiddleware, CommentController.createComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     description: Only the owner of the comment can update it.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       403:
 *         description: You can only update your own comments
 *       404:
 *         description: Comment not found
 */
router.put("/:id", authMiddleware, CommentController.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     description: Only the owner of the comment can delete it.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: You can only delete your own comments
 *       404:
 *         description: Comment not found
 */
router.delete("/:id", authMiddleware, CommentController.deleteComment);

module.exports = router;
