import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsValidPassword } from 'src/validators';

export class RegisterDto {
  @ApiProperty({
    description: 'email',
  })
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'phone',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'address',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'is_admin',
  })
  @IsBoolean()
  @IsNotEmpty()
  is_admin: string;

  @ApiProperty({
    description: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  @IsValidPassword()
  password: string;
}
