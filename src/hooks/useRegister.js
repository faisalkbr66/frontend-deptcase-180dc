import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const registerUser = async (userData) => {
    setIsLoading(true);
    setEmailError('');

    try {
      // Mengirim payload lengkap sesuai dokumentasi Swagger
      const response = await fetch(`${baseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 201) {
        toast.success('Registrasi berhasil!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else if (response.status === 422) {
        // Asumsi API mengembalikan error spesifik pada field email
        const errorMessage = data?.message || 'Email sudah terdaftar atau format tidak valid.';
        setEmailError(errorMessage);
      } else if (response.status === 500) {
        toast.error('Terjadi kesalahan pada server. Silakan coba lagi.');
      } else {
        toast.error(data?.message || 'Proses registrasi gagal.');
      }
    } catch (error) {
      toast.error('Koneksi terputus. Pastikan Anda terhubung ke internet.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearEmailError = () => {
    if (emailError) setEmailError('');
  };

  return { registerUser, isLoading, emailError, clearEmailError };
};