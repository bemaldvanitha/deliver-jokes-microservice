import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from "typeorm";
import { Joke } from './joke.entity';
import { Type } from './type.entity';

@Injectable()
export class JokeService {
  constructor(
    @InjectRepository(Joke)
    private jokeRepository: Repository<Joke>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}

  async getRandomJoke(): Promise<Joke | {}> {
    const count = await this.jokeRepository.count();
    if (count === 0) {
      return {};
    }
    const randomIndex = Math.floor(Math.random() * count);
    const jokes = await this.jokeRepository.find({
      skip: randomIndex,
      take: 1,
    });
    return jokes.length > 0 ? jokes[0] : {};
  }

  async getAllTypes(): Promise<Type[]> {
    return this.typeRepository.find();
  }

  async getRandomJokeByCategory(typeId: number): Promise<Joke | {}> {
    const count = await this.jokeRepository.count({
      where: { type: { id: typeId } } as FindOptionsWhere<Joke>,
    });
    if (count === 0) {
      return {};
    }

    const randomIndex = Math.floor(Math.random() * count);

    const jokes = await this.jokeRepository.find({
      where: { type: { id: typeId } } as FindOptionsWhere<Joke>,
      skip: randomIndex,
      take: 1,
    });

    return jokes.length > 0 ? jokes[0] : {};
  }


  async createJoke(jokeText: string, typeName: string): Promise<Joke> {
    let jokeType = await this.typeRepository.findOne({ where: { type: typeName } });

    if (!jokeType) {
      jokeType = this.typeRepository.create({ type: typeName });
      await this.typeRepository.save(jokeType);
    }

    const joke = this.jokeRepository.create({ joke: jokeText, type: jokeType });
    return this.jokeRepository.save(joke);
  }
}
