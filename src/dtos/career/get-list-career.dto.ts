import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class GetListCareerDto extends ValidateDto {
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
  name: string;
}
