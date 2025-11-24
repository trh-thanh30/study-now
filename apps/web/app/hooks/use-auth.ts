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
  resetPasswordData,
  resetPasswordSchema,
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
import { accessTokenAtom, currentUserAtom, isAuthenticatedAtom } from '../stores/auth';
import { LoginResponse } from '../types/login-response';
import { User } from '../types/user';
import api from '../lib/axios';
import { globalStore } from '../stores/store';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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
  // Reset password form
  const resetPasswordForm = useForm<resetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
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
    try {
      const res = await api.post<ApiResponse<LoginResponse>>(`${AUTH_ENDPOINT.LOGIN}`, data);

      if (res.data.success) {
        const { access_token, user } = res.data.data;
        showSuccessToast(res.data.message);
        globalStore.set(accessTokenAtom, access_token as string);
        globalStore.set(currentUserAtom, user as User);
        globalStore.set(isAuthenticatedAtom, true);
        return true;
      }
    } catch (error) {
      console.log(error);
      const msg = getApiErrorMessage(error);
      showErrorToast(msg);
      return false;
    }
  };

  const handleForgotPassword = async (data: forgotPasswordData) => {
    try {
      const res = await api.post<ApiResponse<ForgotPasswordResponse>>(
        `${AUTH_ENDPOINT.FORGOT_PASSWORD}`,
        data
      );
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
  const handleResetPassword = async (data: resetPasswordData) => {
    try {
      const res = await api.post<ApiResponse>(`${AUTH_ENDPOINT.RESET_PASSWORD}`, data);
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
  const handleGetProfile = async () => {
    try {
      const res = await api.get<ApiResponse>(`${AUTH_ENDPOINT.GET_PROFILE}`);
      if (res.data.success) {
        // showSuccessToast(res.data.message);
        setUser(res.data.data as User);
        return true;
      }
    } catch (error) {
      const msg = getApiErrorMessage(error);
      showErrorToast(msg);
      return false;
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await api.post<ApiResponse>(`${AUTH_ENDPOINT.LOGOUT}`);
      if (res.data.success) {
        globalStore.set(accessTokenAtom, null);
        globalStore.set(currentUserAtom, null);
        globalStore.set(isAuthenticatedAtom, false);
        showSuccessToast(res.data.message);
        router.push('/');
        return true;
      }
    } catch (error) {
      const msg = getApiErrorMessage(error);
      showErrorToast(msg);
      return false;
    }
  };
  return {
    registerForm,
    verifyEmailForm,
    loginForm,
    forgotPasswordForm,
    resetPasswordForm,
    loading,
    user,
    handleRegister,
    handleVerifyEmail,
    handleLogin,
    handleForgotPassword,
    handleResetPassword,
    handleGetProfile,
    handleSignOut,
  };
}
