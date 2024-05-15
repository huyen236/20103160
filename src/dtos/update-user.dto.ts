import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({
    description: 'phone',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'address',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'gender',
  })
  @IsString()
  @IsOptional()
  gender: string;

  @ApiProperty({
    description: 'skill',
  })
  @IsOptional()
  skill: any;

  @ApiProperty({
    description: 'experience',
  })
  @IsString()
  @IsOptional()
  experience: string;

  @ApiProperty({
    description: 'description_job',
  })
  @IsString()
  @IsOptional()
  description_job: string;

  @ApiProperty({
    description: 'specialized',
  })
  @IsString()
  @IsOptional()
  specialized: string;

  @ApiProperty({
    description: 'industry',
  })
  @IsString()
  @IsOptional()
  industry: string;

  @ApiProperty({
    description: 'province',
  })
  @IsString()
  @IsOptional()
  province: string;
}
