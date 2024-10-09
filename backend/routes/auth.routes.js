const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para autenticación de usuarios
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Registro de nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthSignup'
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error en el registro del usuario
 */
router.post("/signup", signup);

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthSignin'
 *     responses:
 *       200:
 *         description: Usuario autenticado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Nombre de usuario o contraseña incorrectos
 *       500:
 *         description: Error en la autenticación
 */
router.post("/signin", signin);

module.exports = router;
