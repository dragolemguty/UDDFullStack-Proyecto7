import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';
import Index from './pages/index';

function App() {
  return (
    <>
      <div className="mx-auto text-2xl px-10">
        <h1 className="text-3xl font-bold underline">
          Pagina Hotelera
        </h1>
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
