import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchingModule } from './modules/matching/matching.module';
import { OtpModule } from './modules/otp/otp.module';
import { PostModule } from './modules/post/post.module';
import { VoteModule } from './modules/vote/vote.module';
import { dataSourceOptions } from '../db/data-source'
// import databaseConfig from './config/database.config'
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { JwtStrategy } from './modules/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), 
    UserModule, MatchingModule, OtpModule, PostModule, VoteModule, AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: JwtStrategy
    },
  ]
})
export class AppModule {}
