import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchingModule } from './modules/matching/matching.module';
import { OtpModule } from './modules/otp/otp.module';
import { PostModule } from './modules/post/post.module';
import { VoteModule } from './modules/vote/vote.module';
import { dataSourceOptions } from '../db/data-source'

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), 
    UserModule, MatchingModule, OtpModule, PostModule, VoteModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
