import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import ValidateDto from '../validate.dto';

export class GetListJobMappingDto extends ValidateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Trạng thái apply',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().split(/ |\,/gi);
    }
    return value;
  })
  @IsString()
  status: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 1710724385,
    description: 'Tìm kiếm: Từ ngày |  Cột: Ngày tạo',
  })
  @Type(() => Number)
  @IsNumber()
  from_time: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 1710724385,
    description: 'Tìm kiếm: Tới ngày |  Cột: Ngày tạo',
  })
  @Type(() => Number)
  @IsNumber()
  to_time: number;
}
