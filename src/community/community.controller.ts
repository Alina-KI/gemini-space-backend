import { Controller } from '@nestjs/common';
import { CommunityService } from './communite.service';

@Controller('/user')
export class CommunityController {
  constructor(private communityService: CommunityService) {}
}
