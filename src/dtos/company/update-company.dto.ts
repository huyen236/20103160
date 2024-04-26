import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class UpdateCompanyDto extends ValidateDto {
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
    description: 'email',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'phone',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'address_company',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  address_company: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'tax_code',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  tax_code: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'link',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  link: string;
}
