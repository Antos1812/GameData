import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGamesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  playtime: number;

  @IsNotEmpty()
  @IsNumber()
  playersnumber: number;

  @IsNotEmpty()
  @IsString()
  description: string;
  
}
