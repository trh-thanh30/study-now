import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;
}
