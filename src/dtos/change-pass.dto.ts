import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidPassword } from 'src/validators';

export class ChangePassDto {
  @ApiProperty({
    description: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  @IsValidPassword()
  oldPassword: string;

  @ApiProperty({
    description: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  @IsValidPassword()
  newPassword: string;
}
