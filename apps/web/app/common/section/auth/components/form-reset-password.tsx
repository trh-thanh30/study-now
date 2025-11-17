import React from 'react';
import { ButtonWithArrow, Logo } from '../../../../components';
import { Input } from '../../../ui';
import { Hash, Lock } from 'lucide-react';

export default function FormResetPassword({
  setStepForgotPassword,
}: {
  setStepForgotPassword: (step: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="gap-3 flex flex-col items-center justify-center">
        <Logo />
        <p className="text-sm font-medium text-gray-500 text-center">
          Enter a new password below to change your password for tranhuuthanhcp@gmail.com.
        </p>
      </div>
      <form className=" space-y-5">
        {/* Email Input */}
        <Input
          withAsterisk
          type="text"
          label="Code"
          placeholder="Enter your code"
          name="code"
          radius="xl"
          color="#333"
          leftSection={<Hash size={16} />}
        />
        <Input
          isInputPassword
          withAsterisk
          type="password"
          label=" Password"
          placeholder="Enter your new password"
          name="newPassword"
          radius="xl"
          color="#333"
          leftSection={<Lock size={16} />}
        />
        <Input
          withAsterisk
          isInputPassword
          type="text"
          label="New Password"
          placeholder="Enter your confirm new password"
          radius="xl"
          color="#333"
          leftSection={<Lock size={16} />}
        />

        <ButtonWithArrow title="Reset Password" type="submit" />
      </form>
      <button
        onClick={() => setStepForgotPassword(1)}
        className="text-xs font-medium text-gray-500 text-center hover:cursor-pointer hover:text-gray-900 duration-200 transition-colors"
      >
        Back to forgot password
      </button>
    </div>
  );
}
