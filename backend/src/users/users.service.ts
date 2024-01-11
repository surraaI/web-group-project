import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUserDto';
import { Role } from '../auth/enums/role.enum';
import { UpdateUserDto } from './dto/updateUserDto';
import { HealthRecord } from '../health-records/schemas/healthRecord.schema';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
import { Request } from 'express';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto, roles?: Role[]): Promise<User> {
    const { name, email, password } = createUserDto;

    const createdUser = new this.userModel({
      name,
      email,
      password,
    });

    if (roles && roles.length) {
      createdUser.roles = roles;
    } else {
      createdUser.roles = [Role.User]; // Assign "user" role by default
    }

    return createdUser.save();
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async deleteAll(): Promise<void> {
    await this.userModel.deleteMany().exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    const createdUser = new this.userModel({
      name,
      email,
      password,
    });

    createdUser.roles = [Role.Admin]; // Assign "user" role by default

    return createdUser.save();
  }
  async addHealthRecordToUser(
    userId: string,
    healthRecord: HealthRecord,
  ): Promise<void> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.myhealthRecords.push(healthRecord);
    await user.save();
  }
  async getRecordsByUserId(request): Promise<HealthRecord[]> {
    const token = this.extractTokenFromRequest(request);
    const userId = this.extractUserIdFromToken(token);
    if (!userId) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.userModel.findById(userId);
    return user.myhealthRecords;
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.substring('Bearer '.length);
    }
    return undefined;
  }

  private extractUserIdFromToken(token: string): string | undefined {
    try {
      const decodedToken = jwt.verify(token, jwtConstants.secret) as {
        id: string;
        roles: Role[];
      };
      return decodedToken.id;
    } catch (error) {
      return undefined;
    }
  }
}
