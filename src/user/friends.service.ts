import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getFriendsByLogin(login: string) {
    // await this.userModel.updateMany({}, { $set: { friends: [] } });
    const user = await this.userModel.findOne({ login }).populate('friends');
    console.log(user);
    return user.friends;
  }

  async getNotFriendsByLogin(login: string) {
    const user = await this.userModel.findOne({ login });
    return this.userModel.find({ _id: { $nin: [...user.friends, user._id] } });
  }

  async addToFriends(login: string, me: UserDocument) {
    me = await this.userModel.findOne({ login: me.login });
    const user = await this.userModel.findOne({ login });

    if (!me.friends.includes(user._id)) {
      me.friends.push(user);
      await me.save();
      user.friends.push(me);
      await user.save();
    }
    console.log('user', await this.userModel.findOne({ login }));
    console.log('me', await this.userModel.findOne({ login: me.login }));
  }

  async removeFromFriends(login: string, me: UserDocument) {
    const user = await this.userModel.findOne({ login });
    me.friends.remove(user);
    await me.save();
    user.friends.remove(me);
    await user.save();
  }
}
