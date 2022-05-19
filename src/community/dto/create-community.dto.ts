import { User } from '../../user/schemas/user.schema';

export class CreateCommunityDto {
  readonly title: string;
  readonly description: string;
  readonly creator: User;
}
