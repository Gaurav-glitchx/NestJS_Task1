import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from '../auth/dto/signup.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const newUser = new this.userModel({
      name: signUpDto.name,
      email: signUpDto.email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}