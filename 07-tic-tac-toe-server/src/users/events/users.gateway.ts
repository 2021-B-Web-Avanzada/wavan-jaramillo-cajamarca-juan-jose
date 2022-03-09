// Copyright 2022 Juanjo Jaramillo <contact@juanjodev02.com>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RegisterConnectionDto } from '../dto/register-connection.dto';
import { UsersService } from '../users.service';

export const USERS_NAMESPACE = '/users';

@WebSocketGateway({
  namespace: USERS_NAMESPACE,
  cors: true,
})
export class UsersGateway implements OnGatewayDisconnect {
  public static connectedUsers: Map<string, string> = new Map();

  @WebSocketServer()
  private server: Server;

  constructor(private usersService: UsersService) {}

  @SubscribeMessage('register-user-connection')
  async handleRegisterUserConnection(
    client: Socket,
    data: RegisterConnectionDto,
  ): Promise<WsResponse<any>> {
    try {
      // update state on database
      const updatedUser = await this.usersService.updateUserConnection(
        data.userId,
        true,
      );

      // save state locally
      // check if user is already connected
      UsersGateway.connectedUsers.set(client.id, data.userId);

      // notify all users in this namespace that a new user has connected
      this.server.emit('user-connected', updatedUser);

      console.log('joining to room', data.userId);
      // join user to the room
      await client.join(data.userId);

      this.server.socketsJoin(client.id);

      return {
        event: 'register-user-connection',
        data: updatedUser,
      };
    } catch (error) {
      console.error(error);
      return {
        event: 'register-user-connection',
        data: error,
      };
    }
  }

  async handleDisconnect(client: Socket) {
    // get user id from socket id
    const userId = UsersGateway.connectedUsers.get(client.id);

    if (!userId) {
      return;
    }

    // leave room
    client.leave(userId);

    // update state on database
    await this.usersService.updateUserConnection(userId, false);
    // notify all users in this namespace that a user has disconnected
    this.server.emit('user-disconnected', userId);
  }

  notifyUser(userId: string, event: string, data: any): boolean {
    this.server.in(userId).emit(event, data);
    return true;
  }

  notifyUsers(usersIds: string[], event: string, data: any): boolean {
    // const socketsIds = usersIds.map((userId) =>
    //   this.getByValue(UsersGateway.connectedUsers, userId),
    // );
    usersIds.forEach((socketId) => {
      if (socketId) {
        console.log('sending to', socketId);
        this.server.in(socketId).emit(event, data);
      }
    });
    return true;
  }

  getByValue(map: Map<string, string>, searchValue: string): string {
    for (const [key, value] of map.entries()) {
      if (value === searchValue) return key;
    }
  }
}
