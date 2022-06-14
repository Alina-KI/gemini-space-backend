import { User } from '../../user/schemas/user.schema';

export class CreateCommunityDto {
  title: string;
  description: string;
  creator: User;
  photo: string;
}
