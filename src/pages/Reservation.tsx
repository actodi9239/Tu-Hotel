import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Reservation: React.FC = () => {
  const navigate = useNavigate();  // Utilizamos el hook useNavigate para la redirección

  const handleGoBack = () => {
    navigate(-1);  // Esta línea redirige a la página anterior
  };

  return (
    <div className="bg-[#111518] min-h-screen text-white">
      <Navbar />

      <div className="max-w-screen-md mx-auto p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-6">Confirma tu reserva</h1>
        <p className="text-gray-400 mb-8">
          Faltan 4 días para el check-in. No te cobraremos hasta que tu reserva esté confirmada.
        </p>

        {/* Detalles del hotel */}
        <div className="mb-8 flex items-start">
          <img
            src="/src/assets/hotel1.jpg"
            alt="Room"
            className="w-1/3 rounded-lg"
          />
          <div className="ml-4">
            <h3 className="text-lg font-bold">Habitación Deluxe con cama King Size</h3>
            <p className="text-gray-400">Hotel Ritz-Carlton, San Francisco</p>
            <p className="text-gray-400 mt-2">2 huéspedes • 1 habitación • 3 noches</p>
            <button className="mt-2 text-blue-500 hover:underline">Ver detalles</button>
          </div>
          <p className="ml-auto text-lg font-bold">$250/noche</p>
        </div>

        {/* Formulario de reserva */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Huésped principal</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Apellido"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <input
              type="email"
              placeholder="Dirección de correo electrónico"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <select
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option>Estados Unidos</option>
              <option>México</option>
              <option>España</option>
              {/* Agregar más opciones de países aquí */}
            </select>
            <input
              type="tel"
              placeholder="Número de teléfono"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-800 rounded focus:ring-blue-600"
              />
              <label className="text-gray-400 text-sm">
                Sí, quiero recibir correos electrónicos de ofertas especiales de Voyage.
              </label>
            </div>
          </div>
        </div>

        {/* Revisión de la reserva */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Revisa los detalles de la reserva</h2>
          <div className="space-y-2 text-gray-400">
            <p>Fechas de estadía: <span className="text-white">Fri, Dec 17 - Sun, Dec 19</span></p>
            <p>Tipo de habitación: <span className="text-white">Habitación Deluxe</span></p>
            <p>Total: <span className="text-white">$750</span></p>
            <p className="text-sm">Política de cancelación: Cancelación gratuita antes del Dec 16.</p>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleGoBack}  // Llamamos a la función handleGoBack al hacer clic en "Atrás"
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Atrás
          </button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">
            Confirmar y pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
