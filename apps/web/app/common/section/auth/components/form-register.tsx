'use client';
import React, { useState } from 'react';
import { Input, Modal } from '../../../ui';
import { Divider } from '@mantine/core';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import useAuth from '../../../../hooks/use-auth';
import FormVerifyEmail from './form-verify-email';
import { ButtonWithArrow } from '../../../../components';
import { ButtonSigninGoogle } from './button-signin-google';

export default function FormRegister() {
  const [openModalVerifyEmail, setOpenModalVerifyEmail] = useState(false);
  const {
    registerForm: {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    },
    handleRegister,
  } = useAuth();

  return (
    <>
      <form
        onSubmit={handleSubmit(async () => {
          const success = await handleRegister(getValues());
          if (success) {
            setOpenModalVerifyEmail(true);
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

        <ButtonWithArrow title="Sign Up" type="submit" />

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-gray-500 hover:text-gray-600 font-semibold">
            Sign In
          </Link>
        </p>
      </form>
      {openModalVerifyEmail && (
        <Modal
          size="lg"
          title="Verify Email"
          opened={openModalVerifyEmail}
          onClose={() => setOpenModalVerifyEmail(false)}
        >
          <FormVerifyEmail setOpenModalVerifyEmail={setOpenModalVerifyEmail} />
        </Modal>
      )}
    </>
  );
}
