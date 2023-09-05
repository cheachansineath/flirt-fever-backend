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
import { UnauthorizedException } from '@nestjs/common';
import { RoomService } from '../../service/room-service/room/room.service';
import { RoomI } from '../../model/room.interface';

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
    private roomService: RoomService,
  ) {}

  @SubscribeMessage('NewMessage')
  handleMessage(@MessageBody() body: string) {
    return 'Hello world!';
    // console.log(body);
  }

  async handleConnection(socket: Socket) {
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
        socket.data.user = user;
        const rooms = await this.roomService.getRoomForUser(user.id);

        //only emit to the specific connected client
        return this.server.to(socket.id).emit('rooms', rooms);
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

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, room: RoomI): Promise<RoomI> {
    return this.roomService.createRoom(room, socket.data.user);
  }
}
