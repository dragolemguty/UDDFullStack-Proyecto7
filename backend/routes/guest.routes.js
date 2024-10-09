const express = require("express");
const router = express.Router();
const auth = require('../middleware/authorization');

const {createGuest, createInitialGuests, findAllGuests, findGuestById, updateGuest, deleteGuest } = require("../controllers/guest.controller");

/**
 * @swagger
 * tags:
 *   name: Guest
 *   description: Endpoints para la gestión de huéspedes
 */

/**
 * @swagger
 * /guest/init:
 *   get:
 *     summary: Inicializar la base de datos con huéspedes
 *     tags: [Guest]
 *     responses:
 *       200:
 *         description: Huéspedes inicializados con éxito
 */
router.get("/init", createInitialGuests);


/**
 * @swagger
 * /guest:
 *   post:
 *     summary: Crea un nuevo guest relacionado con el usuario autenticado
 *     tags: [Guest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_guest
 *               - guest_name
 *               - guest_lastname
 *               - gender
 *               - birth_date
 *               - register_date
 *               - guest_rank
 *             properties:
 *               id_guest:
 *                 type: integer
 *                 description: ID único del huésped
 *                 example: 4
 *               guest_name:
 *                 type: string
 *                 description: Nombre del huésped
 *                 example: "Carlos"
 *               guest_lastname:
 *                 type: string
 *                 description: Apellido del huésped
 *                 example: "Ramirez"
 *               gender:
 *                 type: string
 *                 description: Género del huésped
 *                 example: "M"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del huésped
 *                 example: "1990-02-15"
 *               contact_number:
 *                 type: string
 *                 description: Número de contacto del huésped (opcional)
 *                 example: "123456789"
 *               DNI_number:
 *                 type: string
 *                 description: Número de DNI del huésped (opcional)
 *                 example: "987654321"
 *               guest_adress:
 *                 type: string
 *                 description: Dirección del huésped (opcional)
 *                 example: "Calle Falsa 123"
 *               register_date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de registro del huésped
 *                 example: "2024-10-01"
 *               guest_rank:
 *                 type: string
 *                 description: Rango del huésped
 *                 example: "Standard"
 *               guest_details:
 *                 type: string
 *                 description: Detalles adicionales sobre el huésped (opcional)
 *                 example: "Sin detalles adicionales"
 *     responses:
 *       201:
 *         description: Guest creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Guest creado exitosamente"
 *                 guest:
 *                   $ref: '#/components/schemas/Guest'
 *       401:
 *         description: No autorizado, falta o token no válido
 *       500:
 *         description: Error en la creación del guest
 */
router.post("/", auth, createGuest);

/**
 * @swagger
 * /guest:
 *   get:
 *     summary: Obtener todos los huéspedes
 *     tags: [Guest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de huéspedes obtenida con éxito
 */
router.get("/", auth, findAllGuests);

/**
 * @swagger
 * /guest/{id}:
 *   get:
 *     summary: Obtener un huésped por ID
 *     tags: [Guest]
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
 *         description: Huésped obtenido con éxito
 */
router.get("/:id", auth, findGuestById);

/**
 * @swagger
 * /guest/{id}:
 *   put:
 *     summary: Actualizar un huésped
 *     tags: [Guest]
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
 *             $ref: '#/components/schemas/Guest'
 *     responses:
 *       200:
 *         description: Huésped actualizado con éxito
 */
router.put("/:id", auth, updateGuest);

/**
 * @swagger
 * /guest/{id}:
 *   delete:
 *     summary: Eliminar un huésped
 *     tags: [Guest]
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
 *         description: Huésped eliminado con éxito
 */
router.delete("/:id", auth, deleteGuest);

module.exports = router;
