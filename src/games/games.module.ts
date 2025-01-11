import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Games } from './entities/games.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Games])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
