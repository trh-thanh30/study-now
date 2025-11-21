'use client';
import { globalStore } from './../stores/store';
import axios from 'axios';
import { accessTokenAtom, currentUserAtom, isAuthenticatedAtom } from '../stores/auth';

let isRefreshing = false;
let queue: any[] = [];

// ✅ Helper functions để lưu/lấy token
const getStoredToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
};

const setStoredToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('access_token', token);
};

const removeStoredToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('access_token');
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
  // ✅ Ưu tiên lấy từ atom trước (khi vừa login/refresh)
  let token = globalStore.get(accessTokenAtom);

  // Nếu atom không có, thử lấy từ localStorage (sau reload)
  if (!token) {
    token = getStoredToken();
    if (token) {
      // Sync lại atom
      globalStore.set(accessTokenAtom, token);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 403 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      isRefreshing = true;

      try {
        const res = await api.post('/auth/refresh-token', {});
        const { access_token, user } = res.data.data;

        globalStore.set(accessTokenAtom, access_token);
        globalStore.set(currentUserAtom, user);
        globalStore.set(isAuthenticatedAtom, true);
        setStoredToken(access_token);

        queue.forEach((p) => p.resolve(access_token));
        queue = [];

        original.headers.Authorization = `Bearer ${access_token}`;
        return api(original);
      } catch (err) {
        queue.forEach((p) => p.reject(err));
        queue = [];
        removeStoredToken();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
