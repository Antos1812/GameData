import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateGamesDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(0)
  @Max(100)
  rating: number;

  @IsOptional()
  @IsString()
  description?: string;
}
