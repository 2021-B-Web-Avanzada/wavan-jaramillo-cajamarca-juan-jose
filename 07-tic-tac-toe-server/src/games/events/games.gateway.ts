import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsersGateway } from 'src/users/events/users.gateway';

@WebSocketGateway({
  namespace: '/games',
  cors: true,
})
export class GamesGateway {
  constructor(private usersGateway: UsersGateway) {}
  @SubscribeMessage('drawX')
  drawX(client: Socket, data: any) {
    console.log('drawX', data);
    this.usersGateway.notifyUser(data.userId, 'drawX', data);
  }

  @SubscribeMessage('drawO')
  drawO(client: Socket, data: any) {
    console.log('drawO', data);
    this.usersGateway.notifyUser(data.userId, 'drawO', data);
  }
}
