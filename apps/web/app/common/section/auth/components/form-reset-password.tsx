'use client';
import React, { useEffect, useState } from 'react';
import { ButtonWithArrow, Logo } from '../../../../components';
import { Input } from '../../../ui';
import { Hash, Lock } from 'lucide-react';
import useAuth from '../../../../hooks/use-auth';

export default function FormResetPassword({
  setStepForgotPassword,
  setIsOpenModal,
  email,
}: {
  setStepForgotPassword: (step: number) => void;
  setIsOpenModal: (value: boolean) => void;
  email: string;
}) {
  const {
    resetPasswordForm: {
      register,
      getValues,
      handleSubmit,
      formState: { errors },
    },
    handleResetPassword,
    handleForgotPassword,
  } = useAuth();
  const [isSend, setIsSend] = useState<boolean>(false);
  const [limitTimeLeft, setLimitTimeLeft] = useState(0);
  useEffect(() => {
    if (isSend) {
      const interval = setInterval(() => {
        setLimitTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limitTimeLeft, isSend]);
  return (
    <div className="flex flex-col gap-4">
      <div className="gap-3 flex flex-col items-center justify-center">
        <Logo className="w-12 h-12" />
        <p className="text-sm font-medium text-gray-500 text-center">
          Enter a new password below to change your password for {email}.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(async () => {
          const success = await handleResetPassword(getValues());
          if (success) {
            setIsOpenModal(false);
            setStepForgotPassword(1);
          }
        })}
        className=" space-y-5"
      >
        {/* Email Input */}
        <Input
          withAsterisk
          {...register('code')}
          error={errors.code?.message}
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
          {...register('newPassword')}
          error={errors.newPassword?.message}
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
          {...register('confirmNewPassword')}
          error={errors.confirmNewPassword?.message}
          type="text"
          label="New Password"
          placeholder="Enter your confirm new password"
          radius="xl"
          color="#333"
          leftSection={<Lock size={16} />}
        />

        <ButtonWithArrow title="Reset Password" type="submit" />
      </form>
      <div className="flex items-center justify-center  gap-1.5 text-sm font-medium">
        <p className="text-gray-500">Need to send a new code?</p>
        <button
          type="button"
          disabled={limitTimeLeft > 0}
          onClick={async () => {
            const success = await handleForgotPassword({ email });
            if (success) {
              setIsSend(true);
              setLimitTimeLeft(60);
            }
          }}
          className="text-gray-600 hover:text-gray-800 hover:underline duration-200 transition-colors cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {limitTimeLeft > 0 ? `Resend in ${limitTimeLeft} seconds` : 'Resend'}
        </button>
      </div>
      <button
        onClick={() => setStepForgotPassword(1)}
        className="text-xs font-medium text-gray-500 text-center hover:cursor-pointer hover:text-gray-900 duration-200 transition-colors"
      >
        Back to forgot password
      </button>
    </div>
  );
}
