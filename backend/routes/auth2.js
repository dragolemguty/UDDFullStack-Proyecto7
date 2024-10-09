const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

//Signup = registro

router.post('/signup', async (req, res) => {
    const {username, password} =req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password: hashedPassword});
    await user.save();
    res.status(201).json({message: 'Usuario creado con éxito'});
});

//Login = inicio de sesión
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message: 'Credenciales incorrectas'});
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({message: 'Autenticación exitosa', token});
});

module.exports = router;