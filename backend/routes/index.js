const express = require("express");
const router = express.Router();
const { swaggerDocs, swaggerUi } = require("../swaggerConfig");
const auth2 = require('../middleware/authorization2');
const auth = require('../middleware/authorization');


const bookingRouter = require("./booking.routes");
const roomRouter = require("./room.routes");
const guestRouter = require("./guest.routes");
const guestEventRouter = require("./guestEvent.routes");
const guestRankRouter = require("./guestRank.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const cartRouter = require('./cart.routes'); // Importamos las rutas de carrito

router.get('/users/me', auth2, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(req.user);  // Asegúrate de que req.user contiene datos
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener el perfil del usuario' });
    }
});

router.use("/reservas", bookingRouter); // Rutas para reservas
router.use("/eventos", guestEventRouter); // Rutas para eventos de huésped
router.use("/rooms", roomRouter); // Rutas para habitaciones
router.use("/guest", guestRouter); // Rutas para huespedes
router.use("/ranks", guestRankRouter); // Rutas para ranks
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRouter); // Añadimos las rutas de carrito

// Ruta para la documentación de Swagger
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;




