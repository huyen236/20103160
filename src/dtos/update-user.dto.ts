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

export class UpdateUserDto {
  @ApiProperty({
    description: 'phone',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'address',
  })
  @IsString()
  @IsOptional()
  address: string;
}
