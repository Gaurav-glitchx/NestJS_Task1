import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'bc4e598c58bf004e940855a393b94e51ea52dbf9ab469b357b8ad3a0b432515d88b62872146c4a8a003927b0b36890ae0fd7a0b4dfd2d71ca0a68410d7e2e75e', 
    });
  }

  async validate(payload: any) {
    return this.userService.findOne(payload.email);
  }
}