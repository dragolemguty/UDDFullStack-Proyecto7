const express = require("express");
const router = express.Router();
const auth = require('../middleware/authorization');

const { createEvent, getEventsByBooking, getEventById } = require("../controllers/guestEvent.controller");

/**
 * @swagger
 * tags:
 *   name: GuestEvent
 *   description: Endpoints para la gestión de eventos de huéspedes
 */

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Crear un nuevo evento de huésped
 *     tags: [GuestEvent]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GuestEvent'
 *     responses:
 *       201:
 *         description: Evento de huésped creado exitosamente
 */
router.post("/", auth, createEvent);

/**
 * @swagger
 * /eventos/{id_booking}:
 *   get:
 *     summary: Obtener eventos de huésped por ID de reserva
 *     tags: [GuestEvent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_booking
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida con éxito
 */
router.get("/:id_booking", auth, getEventsByBooking);

/**
 * @swagger
 * /eventos/event/{id}:
 *   get:
 *     summary: Obtener un evento específico de huésped por ID
 *     tags: [GuestEvent]
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
 *         description: Evento obtenido con éxito
 */
router.get("/event/:id", auth, getEventById);

module.exports = router;
