import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class ApplyJobStatisticDto extends ValidateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'job_code',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  job_id: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'company_code',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  company_id: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'from_time',
  })
  @IsOptional()
  @IsNumber()
  from_time?: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'from_time',
  })
  @IsOptional()
  @IsNumber()
  to_time?: number;
}
