import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  email: string;
  @IsOptional()
  password: string;
  @IsOptional()
  username: string;
  @IsOptional()
  verification_code: string | null;
  @IsOptional()
  verification_code_expired: Date | null;
  @IsOptional()
  password_reset_code: string | null;
  @IsOptional()
  password_reset_code_expired: Date | null;
}
