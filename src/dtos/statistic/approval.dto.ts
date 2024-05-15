import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class approvalJobStatisticDto extends ValidateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'company_id',
  })
  @IsOptional()
  @IsString()
  company_id?: string;

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
    description: 'to_time',
  })
  @IsOptional()
  @IsNumber()
  to_time?: number;
}
