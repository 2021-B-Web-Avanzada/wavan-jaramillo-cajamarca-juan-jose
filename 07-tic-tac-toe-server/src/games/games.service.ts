import { BadRequestException, Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UsersGateway } from 'src/users/events/users.gateway';
import { CreateGameDto } from './dto/create-game.dto';
import { RequestGameDto } from './dto/request-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(
    private prismaService: PrismaService,
    private usersGateway: UsersGateway,
  ) {}

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  findAll() {
    return `This action returns all games`;
  }

  findOne(id: string) {
    const game = this.prismaService.game.findFirst({
      where: { id },
      include: { players: true },
    });

    return game;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }

  /**
   * @author Juanjo Jaramillo <contact@juanjodev02.com>
   * @param gameId
   * @param playerId
   * @returns
   */
  async acceptGame(gameId: string, playerId: string) {
    const game = await this.prismaService.game.findFirst({
      where: { id: gameId },
      include: { players: true },
    });

    if (!game) {
      throw new BadRequestException('Game not found, with id: ' + gameId + '.');
    }

    if (game.state !== 'WAITING') {
      throw new BadRequestException(
        'The game is not in waiting state, with id: ' + gameId + '.',
      );
    }

    const player = await this.prismaService.user.findFirst({
      where: { id: playerId },
    });

    if (!player) {
      throw new BadRequestException(
        'Player not found, with id: ' + playerId + '.',
      );
    }

    // if (!player.isConnected) {
    //   throw new BadRequestException('The player is not connected.');
    // }

    const playerIndex = game.players.findIndex(
      (player) => player.id === playerId,
    );

    if (playerIndex === -1) {
      throw new BadRequestException(
        'The player is not part of the game, with id: ' + gameId + '.',
      );
    }

    const updatedGame = await this.prismaService.game.update({
      where: { id: gameId },
      data: {
        state: 'PLAYING',
      },
    });

    // Notify the players
    this.usersGateway.notifyUsers(
      game.players.map((player) => player.id),
      'game-started',
      updatedGame,
    );

    return updatedGame;
  }

  async rejectGame(gameId: string, playerId: string) {
    const game = await this.prismaService.game.findFirst({
      where: { id: gameId },
      include: { players: true },
    });

    if (!game) {
      throw new BadRequestException('Game not found, with id: ' + gameId + '.');
    }

    if (game.state !== 'WAITING') {
      throw new BadRequestException(
        'The game is not in waiting state, with id: ' + gameId + '.',
      );
    }

    const player = await this.prismaService.user.findFirst({
      where: { id: playerId },
    });

    if (!player) {
      throw new BadRequestException(
        'Player not found, with id: ' + playerId + '.',
      );
    }

    if (!player.isConnected) {
      throw new BadRequestException('The player is not connected.');
    }

    const playerIndex = game.players.findIndex(
      (player) => player.id === playerId,
    );

    if (playerIndex === -1) {
      throw new BadRequestException(
        'The player is not part of the game, with id: ' + gameId + '.',
      );
    }

    const updatedGame = await this.prismaService.game.update({
      where: { id: gameId },
      data: {
        state: 'REJECTED',
      },
    });

    // Notify the players
    this.usersGateway.notifyUsers(
      game.players.map((player) => player.id),
      'game-rejected',
      updatedGame,
    );

    return updatedGame;
  }

  /**
   * @author Juanjo Jaramillo <contact@juanjodev02.com>
   * @description
   * 1. Check the players availability
   * 2. Create a new game
   * 3. Add the players to the game
   * 4. Notify the players
   * 4. Return the game created
   * @param requestGameDto data
   * @returns Created game {Promise<Game>}
   */
  async requestGame({
    requestPlayerId,
    requestedPlayerId,
  }: RequestGameDto): Promise<Game> {
    const player1 = await this.prismaService.user.findFirst({
      where: { id: requestPlayerId },
    });

    if (!player1) {
      throw new BadRequestException(
        'Player 1 not found, with id: ' + requestPlayerId + '.',
      );
    }

    const player2 = await this.prismaService.user.findFirst({
      where: { id: requestedPlayerId },
    });

    if (!player2) {
      throw new BadRequestException(
        'Player 2 not found, with id: ' + requestedPlayerId + '.',
      );
    }

    if (!player1.isConnected || !player2.isConnected) {
      throw new BadRequestException('One of the players is not connected.');
    }

    const newGame = await this.prismaService.game.create({
      data: {
        players: {
          connect: [
            {
              id: requestPlayerId,
            },
            {
              id: requestedPlayerId,
            },
          ],
        },
        state: 'WAITING',
        date: new Date(),
      },
      include: {
        players: true,
      },
    });

    // Notify the requested player
    this.usersGateway.notifyUser(
      requestedPlayerId,
      'game-request-received',
      newGame,
    );

    return newGame;
  }
}
