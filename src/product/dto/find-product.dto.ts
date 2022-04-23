import { IsString, IsNumber } from 'class-validator';

export class FindProductDto {
    @IsString()
    category: string;
    
    @IsNumber()
    limit: number;
}