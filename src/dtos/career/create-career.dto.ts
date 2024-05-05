import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class CreateCareerDto extends ValidateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'name',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'code',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  code: string;
}
