import { Body, Delete, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Get } from '@nestjs/common';
import { ObjectId } from 'mongoose';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

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

  @Get('getAll')
  getAll() {
    return this.userService.getAll();
  }

  @Get('getOne:id')
  getOne(@Param('id') id: ObjectId) {
    return this.userService.getOne(id);
  }

  @Delete('delete:id')
  delete(@Param('id') id: ObjectId) {
    return this.userService.delete(id);
  }
}
