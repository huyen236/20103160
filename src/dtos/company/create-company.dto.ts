import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class RegisterCompanyDto extends ValidateDto {

  @ApiProperty({
    type: String,
    required: false,
    description: 'email',
  })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'name',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'phone',
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'address_company',
  })
  @IsOptional()
  @IsString()
  address_company: string;


  @ApiProperty({
    type: String,
    required: false,
    description: 'tax_code',
  })
  @IsOptional()
  @IsString()
  tax_code: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'link',
  })
  @IsOptional()
  @IsString()
  link: string;

}
