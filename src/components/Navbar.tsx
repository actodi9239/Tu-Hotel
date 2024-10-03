import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Cambiamos el estado inicial a "no logueado"

  const handleLogin = () => {
    setIsLoggedIn(true);  // Cambia el estado a "logueado" cuando el usuario presiona "Iniciar Sesión"
  };

  const handleLogout = () => {
    setIsLoggedIn(false);  // Cambia el estado a "no logueado" cuando el usuario presiona "Logout"
  };

  return (
    <nav className="bg-[#111518] border-b border-white border-opacity-20 shadow-md h-20 flex items-center justify-between px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center space-x-2">
          <img src="/src/assets/logo.png" alt="Logo" className="h-6" />
          <span>Hoteles de lujo</span>
        </div>

        {/* Opciones de navegación */}
        <div className="hidden sm:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-gray-400">Inicio</Link>
          <Link to="/explore" className="text-white hover:text-gray-400">Explorar</Link>

          {isLoggedIn ? (
            <>
              <Link to="/register-new-hotel" className="text-white hover:text-gray-400">Register New Hotel</Link>
              <Link to="/reservation-history" className="text-white hover:text-gray-400">Reservation History</Link>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Registrarse
              </Link>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                onClick={handleLogin}  // Llamada para loguear al usuario
              >
                Iniciar Sesión
              </button>
            </>
          )}
        </div>

        {/* Menu desplegable para móviles */}
        <div className="sm:hidden">
          <button className="text-white">Menu</button>
          {/* Aquí podrías implementar un dropdown para móviles */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
