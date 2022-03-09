import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersGateway } from './events/users.gateway';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersGateway],
  exports: [UsersGateway],
})
export class UsersModule {}
