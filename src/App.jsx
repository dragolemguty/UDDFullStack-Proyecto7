import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';
import Index from './pages/index';
import Navbar from './components/navbar';
import Reserve from './pages/reserve';
import MisReservas from './pages/misReservas';
import BookingDetails from './pages/bookingDetails';
import About from './pages/about';
import Cart from './pages/cart';
import { RefreshProvider } from './context/RefreshContext';  // Importar el proveedor del contexto


function App() {
  return (
    <RefreshProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/MisReservas" element={<MisReservas />} />
          <Route path="/booking" element={<BookingDetails />} />
        </Routes>
      </Router>
    </RefreshProvider>
    
  );
}

export default App;
