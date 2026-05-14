// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';

// Mock halaman login untuk demonstrasi alur redirect
const LoginMock = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>Halaman Login</h2>
    <p>Anda berhasil diarahkan ke sini setelah registrasi.</p>
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
        <Route path="/login" element={<LoginMock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;