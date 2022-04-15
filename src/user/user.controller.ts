import { Body, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Get } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { FriendsService } from './friends.service';
import { JwtAuthGuard, User } from '../jwt-auth.guard';
import { UserDocument } from './schemas/user.schema';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private friendsService: FriendsService,
  ) {}

  @Post('registration')
  async registration(@Body() dto: CreateUserDto) {
    // const { refreshToken, user } = await this.userService.registration(dto);
    // // console.log(refreshToken, user);
    // const maxAge = 30 * 24 * 60 * 60 * 1000;
    // return response.cookie('refreshToken', refreshToken, {
    //   maxAge: maxAge,
    //   httpOnly: true,
    // });
    return this.userService.registration(dto);
  }

  @Post('login')
  login(@Body() dto: CreateUserDto) {
    return this.userService.login(dto);
  }

  @Post('isRegistration')
  isRegistered(@Body() dto: CreateUserDto) {
    return this.userService.IsRegistred(dto);
  }

  @Get('getOne/:login')
  getOne(@Param('login') login: string) {
    return this.userService.getOne(login);
  }

  @Delete('delete:id')
  delete(@Param('id') id: ObjectId) {
    return this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':login/friends')
  getFriends(@Param('login') login: string) {
    return this.friendsService.getFriendsByLogin(login);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':login/not-friends')
  getNotFriends(@Param('login') login: string) {
    return this.friendsService.getNotFriendsByLogin(login);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':login/add-to-friends')
  addToFriends(@Param('login') login: string, @User() user: UserDocument) {
    return this.friendsService.addToFriends(login, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':login/remove-from-friends')
  removeFromFriends(@Param('login') login: string, @User() user: UserDocument) {
    return this.friendsService.removeFromFriends(login, user);
  }
}
