import { BadRequestException, Injectable } from '@nestjs/common';
import { Matching } from './entities/matching.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MatchingService {
  constructor(
    @InjectRepository(Matching)
    private matchingRepository: Repository<Matching>,
    private userService: UserService,
  ) {}

  async save(matching: Matching): Promise<Matching> {
    return await this.matchingRepository.save(matching);
  }
  async create(
    fromUserId: number,
    toUserId: number,
  ): Promise<Matching | undefined> {
    const fromUser = await this.userService.findById(fromUserId);
    const toUser = await this.userService.findById(toUserId);
    const checkMatching1 = await this.findByFromAndTo(fromUser, toUser);
    const checkMatching2 = await this.findByFromAndTo(toUser, fromUser);
    if (checkMatching1 != null || checkMatching2 != null)
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Matching record already exist',
      });
    const matching = new Matching();
    matching.fromUser = fromUser;
    matching.toUser = toUser;
    matching.requestedat = new Date();
    return await this.save(matching);
  }

  async confirm(id: number): Promise<Matching | null> {
    const matching = await this.findById(id);
    if (!matching)
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Matching record not found',
      });
    matching.accept = true;
    return await this.save(matching);
  }

  async findById(id: number): Promise<Matching | null> {
    const matching = await this.matchingRepository.findOne({
      where: { id },
      relations: ['toUser', 'fromUser', 'messages', 'messages.author'],
    });
    return matching || null;
  }

  async findByFromAndTo(
    fromUser: User,
    toUser: User,
  ): Promise<Matching | null> {
    const matching = await this.matchingRepository.findOne({
      where: {
        toUser,
        fromUser,
      },
    });
    return matching || null;
  }

  async getUserMatchingRequest(userId: number): Promise<Matching[] | null> {
    const user = await this.userService.findById(userId);
    const matchingRequest = await this.matchingRepository.find({
      where: [
        {
          toUser: user,
          deletedAt: null,
        },
        {
          fromUser: user,
          deletedAt: null,
        },
      ],
      select: ['id', 'fromUser', 'toUser', 'requestedat', 'accept'],
      relations: ['fromUser', 'toUser'],
    });
    console.log(matchingRequest);
    return matchingRequest || null;
  }

  async deleteMatching(id: number): Promise<Matching> {
    const matching = await this.findById(id);
    if (matching == null)
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Matching record not found',
      });
    matching.deletedAt = new Date();
    return await this.save(matching);
  }
}
