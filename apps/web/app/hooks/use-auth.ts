'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordData,
  forgotPasswordSchema,
  loginData,
  loginSchema,
  registerData,
  registerSchema,
  verifyEmailData,
  verifyEmailSchema,
} from '../common/section/auth/data/schema';
import { AUTH_ENDPOINT } from '../const/api';
import { ApiResponse } from '../types/api-response';
import { RegisterResponse } from '../types/register-response';
import { useToast } from './use-toast';
import { useState } from 'react';
import { getApiErrorMessage } from '../helpers/get-api-err-msg';
import { ForgotPasswordResponse } from '../types/forgot-password';
import api from '../lib/axios';

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();
  // Register form
  const registerForm = useForm<registerData>({
    resolver: zodResolver(registerSchema),
  });
  // Verify email form
  const verifyEmailForm = useForm<verifyEmailData>({
    resolver: zodResolver(verifyEmailSchema),
  });
  // Login form
  const loginForm = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });
  // Forgot password form
  const forgotPasswordForm = useForm<forgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  /**
   * Handles the registration process
   * @param data - The data to be registered
   */
  const handleRegister = async (data: registerData) => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<RegisterResponse>>(`${AUTH_ENDPOINT.REGISTER}`, data);
      if (res.data.success) {
        showSuccessToast(res.data.message);
        setLoading(false);
        return true;
      }
    } catch (err) {
      const msg = getApiErrorMessage(err);
      showErrorToast(msg);
      setLoading(false);
      return false;
    }
  };
  const handleVerifyEmail = async (data: verifyEmailData) => {
    try {
      const res = await api.post<ApiResponse>(`${AUTH_ENDPOINT.VERIFY_EMAIL}`, data);
      if (res.data.success) {
        showSuccessToast(res.data.message);
        return true;
      }
    } catch (err) {
      const msg = getApiErrorMessage(err);
      showErrorToast(msg);
      return false;
    }
  };

  const handleLogin = async (data: loginData) => {
    // do some things
  };

  const handleForgotPassword = async (data: forgotPasswordData) => {
    try {
      const res = await api.post<ApiResponse<ForgotPasswordResponse>>(
        `${AUTH_ENDPOINT.FORGOT_PASSWORD}`,
        data
      );
      if (res.data.success) {
        showSuccessToast(res.data.message);
      }
    } catch (err) {
      const msg = getApiErrorMessage(err);
      showErrorToast(msg);
    }
  };
  return {
    registerForm,
    verifyEmailForm,
    loginForm,
    forgotPasswordForm,
    loading,
    handleRegister,
    handleVerifyEmail,
    handleLogin,
    handleForgotPassword,
  };
}
