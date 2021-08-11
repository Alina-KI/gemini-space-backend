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

  async registration(dto: CreateUserDto, password: string | Buffer) {
    const hashPassword = await bcrypt.hash(password, 3);
    // const activationLink = uuid.v4();
    const user = await this.userModel.create({
      ...dto,
      password: hashPassword,
    });
    const payload = { userId: user._id, ...dto };
    const tokens = await this.tokenService.generateToken(payload);
    await this.tokenService.saveToken(user._id, tokens.refreshToken);
    return {
      ...tokens,
      user: user,
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
