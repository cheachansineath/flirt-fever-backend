import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matching } from './entities/matching.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Matching]), UserModule],
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}
