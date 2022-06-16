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
  @Post('/create')
  createComment(@Body() dto: CreateCommunityDto, @User() user: UserDocument) {
    return this.communityService.createCommunity(dto, user);
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

  @UseGuards(JwtAuthGuard)
  @Get('/getNotCommunities')
  getNotCommunities(@User() user: UserDocument) {
    return this.communityService.getNotCommunities(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/addedMember')
  addedMember(@User() user: UserDocument, @Body() id: string) {
    return this.communityService.addedMember(user, id);
  }
}
