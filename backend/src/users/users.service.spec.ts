import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUserDto';
import { Role } from '../auth/enums/role.enum';
import { UpdateUserDto } from './dto/updateUserDto';
import { NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { HealthRecord } from '../health-records/schemas/healthRecord.schema';
import { Request } from 'express';
describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findById', () => {
    it('should find a user by ID', async () => {
      const userId = '65b4c6d0d268fd5c84accbf7';
      const expectedUser = {
        _id: userId,
        name: 'abdi',
        email: 'abdi@gmail.com',
        password:
          '$2b$10$86gU5Az0jkmrXJfij5o6LegtC.BFRx5pzKsw9FiMfTE2Ah7cSmefG',
        roles: [Role.User],
        myhealthRecords: [],
        createdAt: new Date('2024-01-27T09:03:12.762+00:00'),
        updatedAt: new Date('2024-01-27T09:03:12.762+00:00'),
        __v: 0,
      };

      jest.spyOn(userModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(expectedUser),
      } as any);

      const result = await usersService.findById(userId);

      expect(userModel.findById).toHaveBeenCalledTimes(1);
      expect(userModel.findById).toHaveBeenCalledWith(userId); // Updated assertion
      expect(result).toEqual(expectedUser);
    });
  });
});