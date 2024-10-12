// controllers/cartController.js
const Cart = require('../models/Cart');

// Actualizar el carrito
exports.updateCart = async (req, res) => {
  const { userId, reservations } = req.body;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { reservations, lastUpdated: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el carrito', error });
  }
};

// Obtener el carrito
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    res.status(200).json({ message: 'Carrito hallado ',cart});
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error });
  }
};
