
import './App.css';
import { Routes, Route , Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute element={<Home />}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>

    </div>
  );
}

export default App;
