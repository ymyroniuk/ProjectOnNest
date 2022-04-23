import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    name: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @Max(5, { message: 'Рейтинг не может быть более пяти' })
    @Min(1, { message: 'Рейтинг не может быть менее одного' })
    @IsNumber()
    rating: number;
    
    @IsString()
    productId: string;
}