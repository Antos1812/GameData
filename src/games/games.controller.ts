import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { Games } from './entities/games.entity';
import { CreateGamesDto } from 'src/dto/create-games.dto';
import { UpdateGamesDto } from 'src/dto/update-user.dto';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}
    
    @Post()
    create(@Body() createGamesDto: CreateGamesDto){
        return{
            message: 'Game is created',
            data: createGamesDto,
        };
    }

    @Get()
    findAll(): Promise<Games[]> {
        return this.gamesService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Games>{
        return this.gamesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id')id: string, @Body() games: Games): Promise<Games>{
        return this.gamesService.update(Number(id), games);
    }

    @Delete(':id')
    remove(@Param('id')id: string): Promise<void>{
        return this.gamesService.remove(Number(id));
    }
}
