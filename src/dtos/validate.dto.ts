import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsNumber, IsString, Min, Max } from "class-validator";

export default class ValidateDto {
    @ApiProperty({
        description: "DO NOT USE, PLEASE",
        required: false,
        default: 0
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    offset: number;

    @ApiProperty({
        description: "Paginate: current the same to offset param",
        required: false,
        default: 1
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    current: number;

    @ApiProperty({
        description: "DO NOT USE, PLEASE",
        required: false,
        default: 10
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit: number;

    @ApiProperty({
        description: "Paginate: pageSize the same to limit param",
        required: false,
        default: 10
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(1000)
    pageSize: number;

    @ApiProperty({
        description: "Search by ids",
        required: false
    })
    @IsOptional()
    @IsString()
    ids: any;

    getIds() {
        let ids: any = [];
        if (this.ids) ids = this.ids.split(",");
        return ids;
    }

    getOffset() {
        let offset = this.offset || 0;

        // calculate offset from current and pageSize
        if (this.current && this.pageSize) {
            offset = (this.current - 1) * this.pageSize;
        }
        return Number(offset);
    }

    getLimit() {
        return Number(this.limit || this.pageSize || 10);
    }
}
