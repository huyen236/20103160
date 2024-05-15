import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class GetListJobDto extends ValidateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'job_name',
  })
  @IsOptional()
  @IsString()
  job_name: string;

  // @ApiProperty({
  //   type: Number,
  //   required: true,
  //   example: 1710724385,
  //   description: 'Tìm kiếm: Từ ngày |  Cột: Ngày tạo',
  // })
  // @Type(() => Number)
  // @IsNumber()
  // time_start: number;

  // @ApiProperty({
  //   type: Number,
  //   required: true,
  //   example: 1710724385,
  //   description: 'Tìm kiếm: Tới ngày |  Cột: Ngày tạo',
  // })
  // @Type(() => Number)
  // @IsNumber()
  // time_end: number;

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
    description: 'address',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'career_id',
  })
  @IsOptional()
  @IsString()
  career_id: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'company_id',
  })
  @IsOptional()
  @IsString()
  company_id: string;
}
