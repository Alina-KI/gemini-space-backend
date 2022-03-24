import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async registration(dto: CreateUserDto) {
    const { password, ...userInfo } = dto;
    const isUser = await this.userModel.findOne({ email: dto.email });
    if (!isUser) {
      const hashPassword = await bcrypt.hash(password, 10);
      // const activationLink = uuid.v4();
      await this.userModel.create({
        ...dto,
        password: hashPassword,
      });
      // const token = await this.tokenService.generateToken({ ...userInfo });
      // await this.tokenService.saveToken(user._id, tokens.refreshToken);
      return this.tokenService.generateToken({ ...userInfo });
    }
    throw new HttpException(
      'This user already exists!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async login(dto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    const { password, ...userInfo } = dto;
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      return this.tokenService.generateToken({ ...userInfo });
    }
    throw new UnauthorizedException({
      message: 'Incorrect username, email or password!',
    });
  }

  async IsRegistration(dto: CreateUserDto): Promise<boolean> {
    const isUser = await this.userModel.findOne({ email: dto.email });
    return !isUser;
  }

  async getOne(id: ObjectId) {
    return this.userModel.findById(id);
  }

  async findOne(id: ObjectId) {
    return this.userModel.findOne({ id: id });
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user._id;
  }
}
