import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthRecord } from './schemas/healthRecord.schema';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/schemas/user.schema';
import { jwtConstants } from 'src/auth/constants';
import { Role } from 'src/auth/enums/role.enum';
import { UsersService } from '../users/users.service';

@Injectable()
export class HealthRecordsService {
  constructor(
    @InjectModel(HealthRecord.name)
    private healthRecordModel: Model<HealthRecord>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private usersService: UsersService,
  ) {}

  async create(
    createHealthRecordDto: CreateHealthRecordDto,
    request: Request,
  ): Promise<HealthRecord> {
    const token = this.extractTokenFromHeader(request);
    const userId = this.extractIdFromToken(token);
    const createdRecord = new this.healthRecordModel(createHealthRecordDto);
    const savedRecord = await createdRecord.save();
    // Update the user's myHealthRecords array with the created health record
    await this.usersService.addHealthRecordToUser(userId, savedRecord);
    return savedRecord;
  }
  // Rest of the code...

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.substring('Bearer '.length);
    }
    return undefined;
  }

  private extractIdFromToken(token: string): string | undefined {
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

  // Rest of the code...

  async findAll(): Promise<HealthRecord[]> {
    return this.healthRecordModel.find().exec();
  }

  async findOne(id: string): Promise<HealthRecord> {
    return this.healthRecordModel.findById(id).exec();
  }

  async update(
    id: string,
    updateHealthRecordDto: UpdateHealthRecordDto,
  ): Promise<HealthRecord> {
    return this.healthRecordModel
      .findByIdAndUpdate(id, updateHealthRecordDto, { new: true })
      .exec();
  }
  async getRecordsByUserId(userId: string): Promise<HealthRecord[]> {
    const user = this.userModel.findById(userId).exec();
    return (await user).myhealthRecords;
  }

  async remove(id: string): Promise<HealthRecord> {
    return this.healthRecordModel.findOneAndDelete({ _id: id }).exec();
  }
}
