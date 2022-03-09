import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { RequestGameDto } from './dto/request-game.dto';
import { AcceptGameDto } from './dto/accept-game-dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Post('/request-game')
  requestGame(@Body() requestGameDto: RequestGameDto) {
    return this.gamesService.requestGame(requestGameDto);
  }

  @Post('/accept-game')
  acceptGame(@Body() data: AcceptGameDto) {
    console.log(data);
    return this.gamesService.acceptGame(data.gameId, data.playerId);
  }

  @Post('/reject-game')
  rejectGame(@Body() data: AcceptGameDto) {
    return this.gamesService.rejectGame(data.gameId, data.playerId);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
