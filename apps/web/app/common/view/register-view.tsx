import React from 'react';
import { Logo } from '../../components';
import FormRegister from '../section/auth/components/form-register';

export function RegisterView() {
  return (
    <div className="w-full max-w-md">
      {/* Logo Section */}
      <div className="flex justify-center mb-8">
        <Logo />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-semibold text-center text-gray-700 mb-1">Sign Up</h1>
      <p className="text-center text-sm  w-sm mx-auto text-gray-500 mb-8">
        The sign up page is designed to provide a seamless and secure experience for users to create
        an account and start using the application.
      </p>

      {/* Form Container */}
      <div className="flex items-center justify-center w-full">
        <FormRegister />
      </div>

      {/* Footer Links */}
      <div className=" mt-4 space-y-2 text-center">
        <p className="text-xs text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-gray-700 hover:text-gray-900 underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-gray-700 hover:text-gray-900 underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
