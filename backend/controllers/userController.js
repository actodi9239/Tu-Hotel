const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, country, phoneNumber, email, password } = req.body;
    
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear el usuario en la base de datos
    const user = await User.create({ firstName, lastName, country, phoneNumber, email, password: hashedPassword });
    
    // Crear el token JWT basado en el ID y el email del usuario
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver el token junto con los detalles del usuario
    res.status(201).json({ 
      message: 'User registered successfully', 
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        country: user.country,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar el usuario en la base de datos por su email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Verificar si la contraseña es válida
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    // Crear un token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver el token y el usuario
    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        country: user.country,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para verificar el token (middleware)
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    // Si el token es válido, almacena la información decodificada
    req.userId = decoded.userId;
    next();
  });
};
