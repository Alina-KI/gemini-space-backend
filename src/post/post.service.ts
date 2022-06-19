import { Post, PostDocument } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { CreatePostDto, PostUserDto } from './dto/create-post.dto';
import {
  Community,
  CommunityDocument,
} from '../community/schemas/community.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Community.name)
    private communityModel: Model<CommunityDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createPostCommunity(
    dto: CreatePostDto,
    user: UserDocument,
    id: ObjectId,
  ) {
    const post = await this.postModel.create({ ...dto, user });
    const group = await this.communityModel
      .findOne({ _id: id })
      .populate('posts');
    group.posts.push(post);
    group.save();
    return post;
  }

  async getPostsCommunity(id: ObjectId) {
    const group = await this.communityModel.findOne({ _id: id });
    await group.populate('posts').execPopulate();
    return this.postModel
      .find({
        _id: {
          $in: group.posts.map((p) => p._id),
        },
      })
      .populate('likes')
      .populate('user');
  }

  async getPostsUser(login: string) {
    const user = await this.userModel.findOne({ login });
    await user.populate('posts').execPopulate();
    return this.postModel
      .find({
        _id: {
          $in: user.posts.map((p) => p._id),
        },
      })
      .populate('likes')
      .populate('user');
  }

  async createPostUser(data: PostUserDto, user: UserDocument) {
    const { login, text, title, datePublished, photo } = { ...data };
    const dto: CreatePostDto = { text, title, datePublished, photo };
    const post = await this.postModel.create({ ...dto, user });
    const userPost = await this.userModel.findOne({ login }).populate('posts');
    userPost.posts.push(post);
    userPost.save();
    return post;
  }

  async changeLikes(id: string, user: UserDocument) {
    const post = await this.postModel.findOne({ _id: id }).populate('likes');
    const userLike = post.likes.find((u) => u.login === user.login);
    if (userLike) {
      post.likes.pull(user);
    } else {
      post.likes.push(user);
    }
    post.save();
    return post.likes;
  }
}
