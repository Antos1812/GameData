import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { Games } from './entities/games.entity';
import { CreateGamesDto } from 'src/dto/create-games.dto';
import { UpdateGamesDto } from 'src/dto/update-user.dto';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}
    
    @Post()
    async create(@Body() createGamesDto: CreateGamesDto): Promise<{ message: string, data: Games }> {
        const game = await this.gamesService.create(createGamesDto);
        return {
            message: 'Game is created',
            data: game,
        };
    }

    @Get()
    async findAll(): Promise<Games[]> {
        return this.gamesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Games> {
        return this.gamesService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateGamesDto: UpdateGamesDto): Promise<Games> {
        return this.gamesService.update(Number(id), updateGamesDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        await this.gamesService.remove(Number(id));
        return { message: 'Game successfully removed' };
    }
}
