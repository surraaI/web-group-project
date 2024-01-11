import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthRecord } from './schemas/healthRecord.schema';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
import { Role } from '../auth/enums/role.enum';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
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
    request: Request,
  ): Promise<HealthRecord> {
    const token = this.extractTokenFromHeader(request);
    const userId = this.extractIdFromToken(token);
    const updatedRecord = await this.healthRecordModel
      .findByIdAndUpdate(id, updateHealthRecordDto, { new: true })
      .exec();
  
    // Update the health record of the user with userId
    const user = await this.userModel.findById(userId).exec();
    if (user) {
      // Find the index of the health record within the array
      const index = user.myhealthRecords.findIndex(
        (record) => record.id === id,
      );
      if (index !== -1) {
        // Update the specific health record within the array
        user.myhealthRecords[index] = updatedRecord;
  
        // Save the user object with the updated health record
        await user.save();
      }
    }
    return updatedRecord;
  }
  async getRecordsByUserId(userId: string): Promise<HealthRecord[]> {
    const user = this.userModel.findById(userId).exec();
    return (await user).myhealthRecords;
  }

  async remove(id: string, request: Request): Promise<HealthRecord> {
    const token = this.extractTokenFromHeader(request);
    const userId = this.extractIdFromToken(token);
  
    // Find and remove the health record from the healthRecordModel
    const deletedRecord = await this.healthRecordModel.findOneAndDelete({ _id: id }).exec();
  
    // Update the health record array of the user with userId
    const user = await this.userModel.findById(userId).exec();
    if (user) {
      const index = user.myhealthRecords.findIndex(record => record.id === id);
      if (index !== -1) {
        // Remove the health record from the user's healthRecord array
        user.myhealthRecords.splice(index, 1);
  
        // Save the user object with the updated health record array
        await user.save();
      }
    }
  
    return deletedRecord;
  }
}
