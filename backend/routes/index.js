const express = require("express");
const router = express.Router();
const { swaggerDocs, swaggerUi } = require("../swaggerConfig");


const bookingRouter = require("./booking.routes");
const roomRouter = require("./room.routes");
const guestRouter = require("./guest.routes");
const guestEventRouter = require("./guestEvent.routes");
const guestRankRouter = require("./guestRank.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");


router.use("/reservas", bookingRouter); // Rutas para reservas
router.use("/eventos", guestEventRouter); // Rutas para eventos de huésped
router.use("/habitaciones", roomRouter); // Rutas para habitaciones
router.use("/guest", guestRouter); // Rutas para huespedes
router.use("/ranks", guestRankRouter); // Rutas para ranks
router.use("/", authRoutes);
router.use("/users", userRoutes);

// Ruta para la documentación de Swagger
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;




