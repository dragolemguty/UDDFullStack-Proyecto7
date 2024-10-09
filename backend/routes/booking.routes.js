const express = require("express");
const router = express.Router();
const auth = require('../middleware/authorization');

const { createInitialBookings, createBooking, findToday, bookDetails, updateRoom, deleteBook, 
    hotelFilter, datesFilter, roomClassFilter, paidStatus, qtySearch } = require("../controllers/booking.controller");

const handleQueryParams = (req, res, next) => {
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;

    if (hotel) {
        return hotelFilter(req, res, next);
    } else if (fecha_inicio && fecha_fin) {
        return datesFilter(req, res, next);
    } else if (tipo_habitacion) {
        return roomClassFilter(req, res, next);
    } else if (estado) {
        return paidStatus(req, res, next);
    } else if (num_huespedes) {
        return qtySearch(req, res, next);
    } else {
        return findToday(req, res, next);
    }
};

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Endpoints para la gestión de reservas
 */

/**
 * @swagger
 * /reservas/init:
 *   get:
 *     summary: Inicializar la base de datos con reservas
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Reservas inicializadas con éxito
 */
router.get("/init", createInitialBookings);

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Reserva creada con éxito
 */
router.post("/", auth, createBooking);

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener reservas con filtro opcional
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: hotel
 *         in: query
 *         schema:
 *           type: string
 *       - name: fecha_inicio
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *       - name: fecha_fin
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *       - name: tipo_habitacion
 *         in: query
 *         schema:
 *           type: string
 *       - name: estado
 *         in: query
 *         schema:
 *           type: string
 *       - name: num_huespedes
 *         in: query
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida con éxito
 */
router.get("/", auth, handleQueryParams);

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtener detalles de una reserva por ID
 *     tags: [Booking]
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
 *         description: Detalles de la reserva obtenidos con éxito
 */
router.get("/:id", auth, bookDetails);

/**
 * @swagger
 * /reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva
 *     tags: [Booking]
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
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Reserva actualizada con éxito
 */
router.put("/:id", auth, updateRoom);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva
 *     tags: [Booking]
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
 *         description: Reserva eliminada con éxito
 */
router.delete("/:id", auth, deleteBook);

module.exports = router;
