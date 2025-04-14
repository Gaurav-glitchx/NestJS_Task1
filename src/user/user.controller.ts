import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from './schemas/user.schema';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  @Get('/profile')
  getProfile(@GetUser() user: User) {
    return user;
  }
}