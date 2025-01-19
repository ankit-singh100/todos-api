import { IsString, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
