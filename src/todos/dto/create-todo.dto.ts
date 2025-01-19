import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsBoolean()
  user_id: number;
}
