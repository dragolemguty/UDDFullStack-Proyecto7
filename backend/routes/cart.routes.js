// routes/cart.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorization');

const { updateCart, getCart } = require('../controllers/cart.controller');

router.post('/', updateCart);
router.get('/:userId', getCart);

module.exports = router;
