import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Joke } from './joke.entity';
import { Type } from './type.entity';
import { JokeService } from './joke.service';
import { JokeController } from './joke.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Joke, Type])],
  providers: [JokeService],
  controllers: [JokeController],
})
export class JokeModule {}
