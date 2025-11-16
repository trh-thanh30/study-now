'use client';
import React from 'react';
import { Button, Input } from '../../../ui';
import { Divider, Loader } from '@mantine/core';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import useAuth from '../../../../hooks/use-auth';

export default function FormRegister() {
  const {
    registerForm: {
      register,
      handleSubmit,
      formState: { errors },
    },
    loading,
    handleRegister,
  } = useAuth();
  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white rounded-2xl  min-w-lg shadow-lg py-12 px-10 space-y-5 mx-auto "
      >
        {/* Google Sign In Button */}
        <Button
          type="button"
          title="Sign in with Google"
          variant="outline"
          color="#333"
          radius="xl"
          size="md"
          style={{ width: '100%' }}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          }
        />

        {/* Divider */}
        <Divider my="xs" label="OR" labelPosition="center" />

        {/* Email Input */}
        <Input
          {...register('username')}
          error={errors.username?.message}
          withAsterisk
          type="text"
          label="Username"
          placeholder="Enter your username"
          radius="xl"
          color="#333"
          leftSection={<Mail size={16} />}
        />

        {/* Email Input */}
        <Input
          {...register('email')}
          error={errors.email?.message}
          withAsterisk
          type="email"
          label="Email"
          placeholder="Enter your email"
          radius="xl"
          color="#333"
          leftSection={<Mail size={16} />}
        />

        {/* Password Input */}
        <Input
          {...register('password')}
          error={errors.password?.message}
          withAsterisk
          isInputPassword
          type="password"
          label="Password"
          placeholder="Enter your password"
          radius="xl"
          color="#333"
          leftSection={<Lock size={16} />}
        />

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-sm disabled:bg-gray-400 text-white font-semibold py-2 cursor-pointer px-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 group"
        >
          <span>{loading ? <Loader size={'sm'} color="#fff" /> : 'Sign Up'}</span>
          {!loading && (
            <span className="group-hover:translate-x-2 transition-all duration-300">
              <ArrowRight size={16} />
            </span>
          )}
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-gray-500 hover:text-gray-600 font-semibold">
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
