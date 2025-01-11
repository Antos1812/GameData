import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Games } from './entities/games.entity';
import { CreateGamesDto } from 'src/dto/create-games.dto';
import { UpdateGamesDto } from 'src/dto/update-user.dto';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Games) private gamesRepository: Repository<Games>,
    )  {}

    create(createGamesDto: CreateGamesDto): Promise<Games> {
        const game = this.gamesRepository.create(createGamesDto);
        return this.gamesRepository.save(game);
    }
    
    findAll(): Promise<Games[]> {
        return this.gamesRepository.find();
    }

    findOne(id: number): Promise<Games>{
        return this.gamesRepository.findOneBy({ id });
    }

    async update(id: number, updateGamesDto: UpdateGamesDto): Promise<Games>{
        return this.gamesRepository.save({ ...updateGamesDto, id });
    }

    async remove(id: number): Promise<void>{
        await this.gamesRepository.delete(id);
    }
}
