import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class CreateJobDto extends ValidateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'description_job',
  })
  @IsOptional()
  @IsString()
  description_job: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'job_name',
  })
  @IsOptional()
  @IsString()
  job_name: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'description_job',
  })
  @IsOptional()
  @IsString()
  career_id: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'time_start',
  })
  @IsOptional()
  @IsNumber()
  time_start: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'time_end',
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
  @IsString()
  request_cv: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'address',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'benefits',
  })
  @IsOptional()
  @IsString()
  benefits: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'wage',
  })
  @IsOptional()
  @IsString()
  wage: string;
}
