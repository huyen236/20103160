import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class ApplyCVDto extends ValidateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'job_code',
  })
  @IsOptional()
  @IsString()
  job_code: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'user_id',
  })
  @IsOptional()
  @IsString()
  user_id: string;
}
