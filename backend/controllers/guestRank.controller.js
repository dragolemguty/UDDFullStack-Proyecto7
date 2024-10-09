const GuestRank = require('../models/guestRank'); // Importamos el modelo de GuestRank

// Crear rangos de invitados (guest ranks) y guardarlos en la base de datos
const createInitialGuestRanks = async (req, res) => {
  try {
    const guestRanksData = [
      {
        guest_rank: 'Standard',
        descuentos: 0,
        beneficios: null
      },
      {
        guest_rank: 'Premium',
        descuentos: 0.2,
        beneficios: 'breakfast,pool'
      },
      {
        guest_rank: 'VIP',
        descuentos: 0.35,
        beneficios: 'breakfast,pool,helicopter'
      },
      {
        guest_rank: 'Aspiracional',
        descuentos: 0.1,
        beneficios: 'breakfast'
      },
      {
        guest_rank: 'Multado',
        descuentos: 1.1,
        beneficios: null
      }
    ];

    // Insertamos los rangos en la base de datos
    const guestRanks = await GuestRank.insertMany(guestRanksData);
    res.json({ ok: true, description: 'Rangos de invitados creados correctamente', guestRanks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando los rangos de invitados' });
  }
};

// Obtener todos los rangos de invitados
const findAllGuestRanks = async (req, res) => {
  try {
    const guestRanks = await GuestRank.find({});
    res.json({ guestRanks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo los rangos de invitados' });
  }
};

// Obtener un rango de invitado por ID
const findGuestRankById = async (req, res) => {
  try {
    const guestRank = await GuestRank.findById(req.params.id);
    if (guestRank) {
      res.json(guestRank);
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró el rango de invitado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo el rango de invitado' });
  }
};

// Actualizar un rango de invitado
const updateGuestRank = async (req, res) => {
  try {
    const { guest_rank, descuentos, beneficios } = req.body;

    const updatedGuestRank = await GuestRank.findByIdAndUpdate(req.params.id, {
      guest_rank,
      descuentos,
      beneficios
    }, { new: true });

    if (updatedGuestRank) {
      res.json(updatedGuestRank);
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró el rango de invitado para actualizar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando el rango de invitado' });
  }
};

// Eliminar un rango de invitado
const deleteGuestRank = async (req, res) => {
  try {
    const deletedGuestRank = await GuestRank.findByIdAndDelete(req.params.id);
    
    if (deletedGuestRank) {
      res.json({ ok: true, description: 'Rango de invitado eliminado correctamente' });
    } else {
      res.status(404).json({ ok: false, description: 'No se encontró el rango de invitado para eliminar' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando el rango de invitado' });
  }
};

module.exports = { createInitialGuestRanks, findAllGuestRanks, findGuestRankById, updateGuestRank, deleteGuestRank };
