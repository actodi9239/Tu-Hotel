import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Login successful:', response.data);
      // Guardar el token JWT en localStorage
      localStorage.setItem('token', response.data.token);

      // Redirigir al Home en lugar de /profile
      window.location.href = '/'; 
    } catch (error: any) {  
      if (error.response) {
        console.error('Error logging in:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const handleGoogleSuccess = (response: any) => {
    console.log('Google Login Success:', response);
    // Aquí autenticación con Google
  };

  const handleGoogleFailure = () => {
    console.log('Google Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId="TU_CLIENT_ID_DE_GOOGLE">
      <div className="bg-[#111518] min-h-screen text-white">
        <Navbar />

        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/hotel-room.jpg')" }}>
          <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-3xl font-bold mb-6 text-center">Bienvenido de vuelta</h1>

            {/* Formulario de login */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
              >
                Iniciar sesión
              </button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-400" />
              <span className="px-4 text-gray-400">o</span>
              <hr className="flex-grow border-gray-400" />
            </div>

            {/* Botón de Google */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />

            <p className="mt-4 text-center">
              <a href="/forgot-password" className="text-blue-500 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </p>

            <p className="mt-4 text-center">
              <span className="text-gray-300">¿No tienes una cuenta?</span>{' '}
              <a href="/register" className="text-blue-500 hover:underline">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
