const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password, firstName, lastName, country, phoneNumber } = req.body; 

  // Validar que todos los campos requeridos estén presentes
  if (!email || !password || !firstName || !lastName || !country || !phoneNumber) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);  
    const newUser = await User.create({ 
      email, 
      password: hashedPassword, 
      firstName, 
      lastName, 
      country, 
      phoneNumber 
    }); 

    res.status(201).json(newUser);  
  } catch (error) {
    console.error("Error creating user:", error); 
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } }); 
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' }); 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' }); 
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });  
    res.json({ token });  
  } catch (error) {
    console.error("Login failed:", error);  
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
