import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setToken } from '../utils/auth';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

  const loginUser = async (email, password) => {
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 200) {
        const token = data?.data?.access_token;
        
        if (token) {
          setToken(token); // Simpan token menggunakan helper
          toast.success('Login berhasil!');
          navigate('/products'); // Redirect sesuai spesifikasi
        } else {
          toast.error('Token tidak ditemukan dalam respons server.');
        }

      } else if (response.status === 401) {
        // Memenuhi instruksi "Expected Result" tanpa me-refresh halaman
        setLoginError('Email atau password salah');
        
      } else {
        toast.error(data?.message || 'Terjadi kesalahan saat login.');
      }
    } catch (error) {
      toast.error('Koneksi terputus. Pastikan Anda terhubung ke internet.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearLoginError = () => {
    if (loginError) setLoginError('');
  };

  return { loginUser, isLoading, loginError, clearLoginError };
};