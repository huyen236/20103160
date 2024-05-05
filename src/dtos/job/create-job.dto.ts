import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class CreateJobDto extends ValidateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'description_job',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  description_job: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'job_name',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  job_name: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'description_job',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  career_id: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: '23232323',
  })
  @IsOptional()
  @IsNumber()
  time_start: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: '222',
  })
  @IsOptional()
  @IsNumber()
  time_end: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'request_cv',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  request_cv: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'address',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'benefits',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  benefits: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'wage',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  wage: string;
}
