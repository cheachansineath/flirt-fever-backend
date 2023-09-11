import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchingModule } from './modules/matching/matching.module';
import { OtpModule } from './modules/otp/otp.module';
import { PostModule } from './modules/post/post.module';
import { VoteModule } from './modules/vote/vote.module';
// import { dataSourceOptions } from '../db/data-source'
import { typeOrmAsyncConfig, typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { ChatModule } from './modules/chat/chat.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    MatchingModule,
    OtpModule,
    PostModule,
    VoteModule,
    AuthModule,
    ChatModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtStrategy,
    },
  ],
})
export class AppModule {}
