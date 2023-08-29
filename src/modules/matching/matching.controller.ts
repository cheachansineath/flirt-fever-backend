import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { CreateMatchingDto } from './dto/create-matching.dto';
import { UpdateMatchingDto } from './dto/update-matching.dto';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post()
  async sendMatch(@Req() request, @Body() { toUserId }) {
    return await this.matchingService.create(request.user.sub, toUserId);
  }

  @Post('accept/:id')
  async acceptMatching(@Param('id') id: number) {
    return await this.matchingService.confirm(id);
  }

  @Get('requests')
  async getMatchingRequest(@Req() request){
    return await this.matchingService.getUserMatchingRequest(request.user.sub);
  }

  @Delete(':id')
  async deleteMatching(@Param('id') id: number) {
    return await this.matchingService.deleteMatching(id);
  }

}
