import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';
import Index from './pages/index';
import Navbar from './components/navbar';

function App() {
  return (
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    
  );
}

export default App;
