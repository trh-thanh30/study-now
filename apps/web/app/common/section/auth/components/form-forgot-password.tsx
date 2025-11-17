'use client';
import React from 'react';
import { Input } from '../../../ui';
import { Mail } from 'lucide-react';
import { ButtonWithArrow, Logo } from '../../../../components';
import useAuth from '../../../../hooks/use-auth';

export function FormForgotPassword({
  setStepForgotPassword,
  setEmail,
}: {
  setStepForgotPassword: (step: number) => void;
  setEmail: (email: string) => void;
}) {
  const {
    forgotPasswordForm: {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    },
    handleForgotPassword,
  } = useAuth();
  return (
    <div className="flex flex-col gap-4">
      <div className="gap-3 flex flex-col items-center justify-center">
        <Logo />
        <p className="text-sm font-medium text-gray-500 text-center">
          Enter your phone number or email address and we will send you a verification code to reset
          your password.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(async () => {
          const success = await handleForgotPassword(getValues());
          if (success) {
            setStepForgotPassword(2);
            setEmail(getValues().email);
          }
        })}
        className=" space-y-5"
      >
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

        {/* Button */}
        <ButtonWithArrow title="Continue" type="submit" />
      </form>
    </div>
  );
}
