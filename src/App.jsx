import './App.css'
import Cart from './cart';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';

function App() {
  return(
    <div className="App">
      <Cart/>
    </div>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>

  );

};

export default App;