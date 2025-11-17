import { z } from 'zod';
/**
 * registerSchema is a schema for registering a user
 */
export const registerSchema = z.object({
  username: z.string().min(3, { error: 'Username must be at least 3 characters' }).nonempty({
    error: 'Username is required',
  }),
  email: z
    .string()
    .nonempty({
      error: 'Email is required',
    })
    .email({
      error: 'Invalid email address',
    }),
  password: z
    .string()
    .min(6, {
      error: 'Password must be at least 6 characters',
    })
    .nonempty({
      error: 'Password is required',
    }),
});
/**
 * login is a schema for logging in a user
 */
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({
      error: 'Email is required',
    })
    .email({
      error: 'Invalid email address',
    }),
  password: z
    .string()
    .min(6, {
      error: 'Password must be at least 6 characters',
    })
    .nonempty({
      error: 'Password is required',
    }),
});

/**
 * verifyEmailSchema is a schema for verifying a user's email
 */
export const verifyEmailSchema = z.object({
  verificationCode: z.string().nonempty({ error: 'Verification code is required' }),
});

/**
 * forgotPassword is a schema for verifying a user's email
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty({
      error: 'Email is required',
    })
    .email({
      error: 'Invalid email address',
    }),
});

/**
 * resetPassword is a schema for verifying a user's email
 */
export const resetPasswordSchema = z
  .object({
    newPassword: z.string().nonempty({ error: 'New password is required' }).min(6, {
      error: 'Password must be at least 6 characters',
    }),
    confirmNewPassword: z.string().nonempty({ error: 'Confirm password is required' }).min(6, {
      error: 'Password must be at least 6 characters',
    }),
    code: z.string().nonempty({ error: 'Code is required' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'], // This specifies where the error message will be attached
  });

/**
 * registerData is a type for registerSchema
 */
export type registerData = z.infer<typeof registerSchema>;

/**
 * loginData is a type for loginSchema
 */
export type loginData = z.infer<typeof loginSchema>;

/**
 * verifyEmailData is a type for verifyEmailSchema
 */
export type verifyEmailData = z.infer<typeof verifyEmailSchema>;

/**
 * forgotPasswordData is a type for forgotPasswordSchema
 */
export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>;

/**
 * resetPasswordData is a type for resetPasswordSchema
 */
export type resetPasswordData = z.infer<typeof resetPasswordSchema>;
