import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty({
    message: 'New password is required',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  newPassword: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsNotEmpty({
    message: 'Confirm password is required',
  })
  confirmNewPassword: string;

  @IsString()
  @IsNotEmpty({
    message: 'Code is required',
  })
  code: string;
}
