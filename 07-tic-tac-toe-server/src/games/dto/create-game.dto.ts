import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class PlayerInfo {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  shape: string;
}

export class CreateGameDto {
  @ValidateNested()
  player1: PlayerInfo;

  @ValidateNested()
  player2: PlayerInfo;
}
