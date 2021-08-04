import { Body, Delete, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Get } from '@nestjs/common';
import { ObjectId } from 'mongoose';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  registration(@Body() dto: CreateUserDto, password: string) {
    return this.userService.registration(dto, password);
  }

  @Post()
  login(@Body() dto: CreateUserDto) {
    return this.userService.login(dto);
  }

  @Post()
  logout(@Body() dto: CreateUserDto) {
    return this.userService.logout(dto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.userService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.userService.delete(id);
  }
}
