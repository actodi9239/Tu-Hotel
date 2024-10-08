import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    countryCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, passwordMismatch: true });
      return; // Detener la ejecución si hay un error
    }

    setErrors({ ...errors, passwordMismatch: false });

    try {
      // Hacer la solicitud POST al backend
      const response = await axios.post('http://localhost:3001/api/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
      });

      console.log('User registered successfully:', response.data);

    } catch (error: any) { // Cambiado a 'any'
      console.error('Error registering user:', error);

      // Mostrar el mensaje de error recibido del servidor
      if (error.response && error.response.data) {
        const serverMessage = error.response.data.message || 'Error desconocido';
        alert(serverMessage); // Puedes usar un modal o un toast en lugar de alert
      } else {
        alert('Error al comunicarse con el servidor.');
      }
    }
  };


  const handleGoogleSuccess = (response: any) => {
    console.log("Google Login Success:", response);

  };

  const handleGoogleFailure = () => {
    console.log("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="TU_CLIENT_ID_DE_GOOGLE">
      <div className="bg-[#111518] min-h-screen text-white">
        <Navbar />
        <div className="max-w-screen-sm mx-auto p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-6">Regístrate en Hoteles de lujo</h1>

          {/* Formulario de registro */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Nombre"
                required
                className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Apellido</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Apellido"
                required
                className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">País</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="País"
                required
                className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Código del país</label>
                <input
                  type="text"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  placeholder="+1"
                  required
                  className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Número de celular</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Número de celular"
                  required
                  className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Correo electrónico"
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
                placeholder="Contraseña"
                required
                className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirmar contraseña"
                required
                className="mt-1 px-4 py-2 bg-gray-800 text-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.passwordMismatch && (
                <p className="text-red-500 text-sm mt-2">Las contraseñas no coinciden</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-blue-600 bg-gray-800 rounded focus:ring-blue-600"
              />
              <label className="ml-2 text-sm text-gray-300">
                Al seleccionar Aceptar y continuar, acepto los Términos del servicio y la Política de privacidad.
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
            >
              Aceptar y continuar
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
            <span className="text-gray-300">¿Ya tienes una cuenta?</span>{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Registration;
