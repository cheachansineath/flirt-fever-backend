import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from 'src/modules/auth/auth.service';
import { Socket } from 'socket.io';
import { UserService } from 'src/modules/user/user.service';
import { disconnect } from 'process';
import { UnauthorizedException } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  title: string[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @SubscribeMessage('NewMessage')
  handleMessage(@MessageBody() body: string) {
    return 'Hello world!';
    // console.log(body);
  }

  async handleConnection(socket: Socket) {
    // const decodeToken = await this.authService.verifyJwt(
    //   socket.handshake.headers.authorization,
    // );
    // console.log(decodeToken);
    // const user = await this.userService.findById(decodeToken.sub);
    // console.log(user);
    try {
      const decodeToken = await this.authService.verifyJwt(
        socket.handshake.headers.authorization,
      );
      console.log(decodeToken);
      const user = await this.userService.findById(decodeToken.sub);
      console.log(user);
      if (!user) {
        // disconnect
        return this.disconnect(socket);
      } else {
        this.title.push('value' + Math.random().toString());
        this.server.emit('message', this.title);
      }
    } catch {
      // disconnect
      return this.disconnect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    socket.disconnect();
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
