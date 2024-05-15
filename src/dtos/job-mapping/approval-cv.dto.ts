import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class approvalCVDto extends ValidateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'status',
  })
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'job_id',
  })
  @IsOptional()
  @IsString()
  job_id: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'company_id',
  })
  @IsOptional()
  @IsString()
  company_id: string;
}
