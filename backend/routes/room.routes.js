const express = require("express");
const router = express.Router();
const auth = require('../middleware/authorization'); // Middleware de autenticación

const { createInitialRooms, findAllRooms, findRoomById, updateRoom, deleteRoom } = require("../controllers/room.controller");

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: Endpoints para la gestión de habitaciones
 */

/**
 * @swagger
 * /habitaciones/init:
 *   get:
 *     summary: Poblar la base de datos con habitaciones iniciales
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: Base de datos poblada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
router.get("/init", createInitialRooms); // Poblar con habitaciones iniciales

/**
 * @swagger
 * /habitaciones:
 *   get:
 *     summary: Obtener todas las habitaciones
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las habitaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
router.get("/", auth, findAllRooms); // Obtener todas las habitaciones

/**
 * @swagger
 * /habitaciones/{id}:
 *   get:
 *     summary: Obtener una habitación por ID
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la habitación a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habitación obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Habitación no encontrada
 */
router.get("/:id", auth, findRoomById); // Obtener una habitación por ID

/**
 * @swagger
 * /habitaciones/{id}:
 *   put:
 *     summary: Actualizar una habitación
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la habitación a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Habitación actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Habitación no encontrada
 */
router.put("/:id", auth, updateRoom); // Actualizar una habitación

/**
 * @swagger
 * /habitaciones/{id}:
 *   delete:
 *     summary: Eliminar una habitación
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la habitación a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Habitación eliminada con éxito
 *       404:
 *         description: Habitación no encontrada
 */
router.delete("/:id", auth, deleteRoom); // Eliminar una habitación

module.exports = router;
