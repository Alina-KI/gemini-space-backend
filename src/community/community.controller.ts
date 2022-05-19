import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommunityService } from './communite.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { JwtAuthGuard, User } from '../jwt-auth.guard';
import { UserDocument } from '../user/schemas/user.schema';

@Controller('/community')
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createComment(@Body() dto: CreateCommunityDto) {
    return this.communityService.createCommunity(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.communityService.deleteCommunity(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getCommunities')
  getCommunities(@User() user: UserDocument) {
    return this.communityService.getCommunities(user);
  }
}
