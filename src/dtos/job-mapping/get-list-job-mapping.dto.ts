import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class GetListJobMappingDto extends ValidateDto {
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
    description: 'company_id',
  })
  @IsOptional()
  @IsString()
  company_id: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 1710724385,
    description: 'from_time',
  })
  @Type(() => Number)
  @IsNumber()
  from_time: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 1710724385,
    description: 'to_time',
  })
  @Type(() => Number)
  @IsNumber()
  to_time: number;
}
