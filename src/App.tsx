import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExploreHotels from './pages/ExploreHotels';
import HotelDetails from './pages/HotelDetails';
import Reservation from './pages/Reservation';
import Registration from './pages/Registration';
import Login from './pages/Login';
import RegisterNewHotel from './pages/RegisterNewHotel';  // Importar RegisterNewHotel
import ReservationHistory from './pages/ReservationHistory';  // Importar ReservationHistory

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreHotels />} />
        <Route path="/hotel-details/:id" element={<HotelDetails />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-new-hotel" element={<RegisterNewHotel />} />  {/* Nueva ruta */}
        <Route path="/reservation-history" element={<ReservationHistory />} />  {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;
