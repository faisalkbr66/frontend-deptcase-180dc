// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

// Mock halaman Products
const ProductsMock = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>Halaman Products (Dashboard)</h2>
    <p> Ini adalah halaman Products Mock.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Set rute default ke register untuk pengerjaan tugas ini */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        {/* Rute Utama */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsMock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
