'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginData,
  loginSchema,
  registerData,
  registerSchema,
} from '../common/section/auth/data/schema';
import { AUTH_ENDPOINT } from '../const/api';
import { ApiResponse } from '../types/api-response';
import { RegisterResponse } from '../types/register-response';
import { useToast } from './use-toast';
import { useState } from 'react';
import api from '../lib/axios';
import { getApiErrorMessage } from '../helpers/get-api-err-msg';

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();
  // Register form
  const registerForm = useForm<registerData>({
    resolver: zodResolver(registerSchema),
  });
  // Login form
  const loginForm = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });

  const handleRegister = async (data: registerData) => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<RegisterResponse>>(`${AUTH_ENDPOINT.REGISTER}`, data);
      if (res.data.success) {
        showSuccessToast(res.data.message);
        setLoading(false);
      }
    } catch (err) {
      const msg = getApiErrorMessage(err);
      showErrorToast(msg);
      setLoading(false);
    }
  };
  return { registerForm, loading, handleRegister };
}
