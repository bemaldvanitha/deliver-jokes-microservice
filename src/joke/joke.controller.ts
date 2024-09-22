import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

import { JokeService } from './joke.service';
import { MicroserviceGuard } from "../guard/guard";

@ApiTags('jokes')
@Controller('jokes')
export class JokeController {
  constructor(private readonly jokeService: JokeService) {}

  @Get('random')
  @ApiOperation({ summary: 'Get a random joke' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved a random joke.' })
  async getRandomJoke() {
    const joke = await this.jokeService.getRandomJoke();
    return { joke };
  }

  @Get('types')
  @ApiOperation({ summary: 'Get all joke types' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all joke types.' })
  async getAllTypes() {
    const types = await this.jokeService.getAllTypes();
    return { types };
  }

  @Get('random/category/:typeId')
  @ApiOperation({ summary: 'Get a random joke by category' })
  @ApiParam({ name: 'typeId', required: true, description: 'The ID of the joke category' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved a random joke for the specified category.' })
  async getRandomJokeByCategory(@Param('typeId') typeId: number) {
    const joke = await this.jokeService.getRandomJokeByCategory(typeId);
    return { joke };
  }

  @Post()
  @UseGuards(MicroserviceGuard)
  @ApiOperation({ summary: 'Create a new joke' })
  @ApiBody({
    description: 'The joke details',
    schema: {
      type: 'object',
      properties: {
        joke: { type: 'string', example: 'Why did the chicken cross the road? To get to the other side.' },
        type: { type: 'string', example: 'general' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Successfully created a new joke.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Microservice guard failed.' })
  async createJoke(@Body() body: { joke: string; type: string }) {
    const { joke, type } = body;
    const newJoke = await this.jokeService.createJoke(joke, type);
    return { newJoke };
  }
}
