import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tokenService: TokenService,
  ) {}

  async registration(dto: CreateUserDto, password: string) {
    const hashPassword = await bcrypt.hash(password, 5);
    // const activationLink = uuid.v4();
    const tokens = await this.tokenService.generateToken({ ...dto });
    await this.tokenService.saveToken(dto._id, tokens.refreshToken);
    return {
      ...tokens,
      user: this.userModel.create({ ...dto, password: hashPassword }),
    };
  }

  async login(dto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...dto });
  }

  async logout(dto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...dto });
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async getOne(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user._id;
  }
}
