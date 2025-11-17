'use client';
import React from 'react';
import { Input } from '../../../ui';
import { Hash } from 'lucide-react';
import { ButtonWithArrow } from '../../../../components';
import useAuth from '../../../../hooks/use-auth';
import { useRouter } from 'next/navigation';

export default function FormVerifyEmail({
  setOpenModalVerifyEmail,
}: {
  setOpenModalVerifyEmail: (value: boolean) => void;
}) {
  const {
    verifyEmailForm: {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    },
    handleVerifyEmail,
  } = useAuth();
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          // Call the handleVerifyEmail function from the useAuth hook
          // and pass the form data as an argument
          const success = await handleVerifyEmail(data);
          if (success) {
            // If the verification is successful, close the modal and navigate to the login page
            setOpenModalVerifyEmail(false);
            router.push('/auth/login');
          }
        })}
        className="space-y-5 "
      >
        {/* Email Input */}
        <Input
          withAsterisk
          {...register('verificationCode')}
          error={errors.verificationCode?.message}
          type="text"
          name="verificationCode"
          label="Verification Code"
          placeholder="Enter your verification code"
          radius="xl"
          color="#333"
          leftSection={<Hash size={16} />}
        />

        {/* Register Button */}

        <ButtonWithArrow title="Verify Account" type="submit" />
        {/* Sign Up Link */}
        {/* <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-gray-500 hover:text-gray-600 font-semibold">
            Sign In
          </Link>
        </p> */}
      </form>
    </>
  );
}
