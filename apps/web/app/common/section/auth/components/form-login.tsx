'use client';
import React, { useState } from 'react';
import { Checkbox, Input, Modal } from '../../../ui';
import { Divider } from '@mantine/core';
import { Lock, Mail } from 'lucide-react';
import { FormForgotPassword } from './form-forgot-password';
import { ButtonWithArrow } from '../../../../components';
import { useRouter } from 'next/navigation';
import { ButtonSigninGoogle } from './button-signin-google';
import Link from 'next/link';
import FormResetPassword from './form-reset-password';
import useAuth from '../../../../hooks/use-auth';

export default function FormLogin() {
  const router = useRouter();
  const [isOpenModalForgotPassword, setOpenModalForgotPassword] = useState<boolean>(false);
  const [stepForgotPassword, setStepForgotPassword] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const {
    loginForm: {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    },
    handleLogin,
  } = useAuth();

  return (
    <>
      <form
        onSubmit={handleSubmit(async () => {
          const success = await handleLogin(getValues());
          if (success) {
            router.push('/dashboard/timer');
          }
        })}
        className="bg-white rounded-2xl  min-w-lg shadow-lg py-12 px-10 space-y-5 mx-auto "
      >
        {/* Google Sign In Button */}
        <ButtonSigninGoogle />
        {/* Divider */}
        <Divider my="xs" label="OR" labelPosition="center" />

        {/* Email Input */}
        <Input
          withAsterisk
          {...register('email')}
          error={errors.email?.message}
          type="email"
          label="Email"
          placeholder="Enter your email"
          radius="xl"
          color="#333"
          leftSection={<Mail size={16} />}
        />

        {/* Password Input */}
        <Input
          withAsterisk
          isInputPassword
          {...register('password')}
          error={errors.password?.message}
          type="password"
          label="Password"
          placeholder="Enter your password"
          radius="xl"
          color="#333"
          leftSection={<Lock size={16} />}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" size="sm" radius="xl" />
          <button
            onClick={() => setOpenModalForgotPassword(true)}
            type="button"
            className="text-sm text-gray-500 hover:text-gray-900  font-medium cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <ButtonWithArrow title="Sign In" type="submit" />

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-gray-500 hover:text-gray-600 font-semibold">
            Sign up
          </Link>
        </p>
      </form>
      <Modal
        size="lg"
        closeOnClickOutside={false}
        opened={isOpenModalForgotPassword}
        onClose={() => setOpenModalForgotPassword(false)}
        title={stepForgotPassword === 1 ? 'Forgot Password' : 'Reset Password'}
      >
        {stepForgotPassword === 1 && (
          <FormForgotPassword setStepForgotPassword={setStepForgotPassword} setEmail={setEmail} />
        )}
        {stepForgotPassword === 2 && (
          <FormResetPassword
            setStepForgotPassword={setStepForgotPassword}
            setIsOpenModal={setOpenModalForgotPassword}
            email={email}
          />
        )}
      </Modal>
    </>
  );
}
