// src/pages/Login.jsx
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useLogin } from '../hooks/useLogin';
import { isValidEmail } from '../utils/validators';
import './Register.css'; // Kita reuse CSS dari Register

const Login = () => {
  const { loginUser, isLoading, loginError, clearLoginError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email' || name === 'password') clearLoginError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    if (!isValidEmail(formData.email)) {
      toast.error('Format email tidak valid.');
      return;
    }

    await loginUser(formData.email, formData.password);
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="register-container">
      <Toaster position="top-center" />
      
      <div className="register-card">
        <h2 className="register-title">Login Dashboard</h2>
        
        {/* Menampilkan error 401 di bagian atas form */}
        {loginError && (
          <div style={{
            backgroundColor: 'var(--error-bg)',
            color: 'var(--error-color)',
            padding: '10px',
            borderRadius: 'var(--border-radius)',
            marginBottom: '16px',
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper" style={{ display: 'flex', gap: '8px' }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password Anda"
                required
                disabled={isLoading}
                style={{ flex: 1 }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ padding: '0 12px', cursor: 'pointer' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? 'Memverifikasi...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;