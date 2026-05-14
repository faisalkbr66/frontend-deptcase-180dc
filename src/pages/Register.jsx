import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useRegister } from '../hooks/useRegister';
import { isValidEmail } from '../utils/validators';
import './Register.css';

const Register = () => {
  const { registerUser, isLoading, emailError, clearEmailError } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === 'email') clearEmailError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      toast.error('Format email tidak valid.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    // Kirim seluruh state form ke hook
    await registerUser(formData);
  };

  const isFormValid = formData.name && formData.email && formData.password && formData.confirmPassword;

  return (
    <div className="register-container">
      <Toaster position="top-center" />
      
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        
        <form onSubmit={handleSubmit} className="register-form">
          {/* Field Name (Tambahan berdasarkan Swagger) */}
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
              disabled={isLoading}
            />
          </div>

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
              className={emailError ? 'input-error' : ''}
              disabled={isLoading}
            />
            {emailError && <span className="error-text">{emailError}</span>}
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
                placeholder="Minimal 8 karakter"
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password"
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;