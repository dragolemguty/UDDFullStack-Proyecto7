const express = require("express");
const router = express.Router();
const auth = require('../middleware/authorization');

const { createInitialGuestRanks, findAllGuestRanks, findGuestRankById, updateGuestRank, deleteGuestRank } = require("../controllers/guestRank.controller");

/**
 * @swagger
 * tags:
 *   name: GuestRank
 *   description: Endpoints para la gestión de categorías de huéspedes
 */

/**
 * @swagger
 * /ranks/init:
 *   get:
 *     summary: Inicializar la base de datos con rangos de huéspedes
 *     tags: [GuestRank]
 *     responses:
 *       200:
 *         description: Rangos inicializados con éxito
 */
router.get("/init", createInitialGuestRanks);

/**
 * @swagger
 * /ranks:
 *   get:
 *     summary: Obtener todos los rangos de huéspedes
 *     tags: [GuestRank]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rangos obtenida con éxito
 */
router.get("/", auth, findAllGuestRanks);

/**
 * @swagger
 * /ranks/{id}:
 *   get:
 *     summary: Obtener un rango de huésped por ID
 *     tags: [GuestRank]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rango de huésped obtenido con éxito
 */
router.get("/:id", auth, findGuestRankById);

/**
 * @swagger
 * /ranks/{id}:
 *   put:
 *     summary: Actualizar un rango de huésped
 *     tags: [GuestRank]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GuestRank'
 *     responses:
 *       200:
 *         description: Rango de huésped actualizado con éxito
 */
router.put("/:id", auth, updateGuestRank);

/**
 * @swagger
 * /ranks/{id}:
 *   delete:
 *     summary: Eliminar un rango de huésped
 *     tags: [GuestRank]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rango de huésped eliminado con éxito
 */
router.delete("/:id", auth, deleteGuestRank);

module.exports = router;
