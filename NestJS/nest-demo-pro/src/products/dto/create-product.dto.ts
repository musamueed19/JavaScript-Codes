import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    id!: string;

    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString()
    name!: string;

    @IsNumber()
    price!: number;

    @IsNumber()
    qty!: number;
}