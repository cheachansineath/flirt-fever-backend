import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from 'src/modules/auth/auth.service';
import { Socket } from 'socket.io';
import { UserService } from 'src/modules/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
// implements OnGatewayConnection, OnGatewayDisconnect
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  title: string[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected: ' + client.id);
    client.emit('connected', { status: 'connected' });
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Create body');
  }

  @OnEvent('message.created')
  handleMessageCreatedEvent(payload: any) {
    console.log('Message created: ');
    console.log(payload);
    this.server.emit('onMessage', payload);
  }
  // async handleConnection(socket: Socket) {
  //   try {
  //     const decodeToken = await this.authService.verifyJwt(
  //       socket.handshake.headers.authorization,
  //     );
  //     console.log(decodeToken);
  //     const user = await this.userService.findById(decodeToken.sub);
  //     console.log(user);
  //     if (!user) {
  //       // disconnect
  //       return this.disconnect(socket);
  //     } else {
  //       socket.data.user = user;

  //       //only emit to the specific connected client
  //     }
  //   } catch {
  //     // disconnect
  //     return this.disconnect(socket);
  //   }
  // }

  // handleDisconnect(socket: Socket) {
  //   socket.disconnect();
  // }

  // private disconnect(socket: Socket) {
  //   socket.emit('Error', new UnauthorizedException());
  //   socket.disconnect();
  // }
}
