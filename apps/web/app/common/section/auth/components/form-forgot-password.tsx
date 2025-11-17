'use client';
import React from 'react';
import { Input } from '../../../ui';
import { Mail } from 'lucide-react';
import { ButtonWithArrow, Logo } from '../../../../components';

export function FormForgotPassword({
  setStepForgotPassword,
}: {
  setStepForgotPassword: (step: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="gap-3 flex flex-col items-center justify-center">
        <Logo />
        <p className="text-sm font-medium text-gray-500 text-center">
          Enter your phone number or email address and we will send you a verification code to reset
          your password.
        </p>
      </div>
      <form className=" space-y-5">
        {/* Email Input */}
        <Input
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
