import { Test, TestingModule } from '@nestjs/testing';
import { HealthRecordsService } from './health-records.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthRecord } from './schemas/healthRecord.schema';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

describe('HealthRecordsService', () => {
  let healthRecordsService: HealthRecordsService;
  let healthRecordModel: Model<HealthRecord>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthRecordsService,
        {
          provide: getModelToken(HealthRecord.name),
          useValue: Model,
        },
        {
          provide: getModelToken(User.name), // Add this line
          useValue: Model, // Add this line
        },
        UsersService,
      ],
    }).compile();

    healthRecordsService =
      module.get<HealthRecordsService>(HealthRecordsService);
    healthRecordModel = module.get<Model<HealthRecord>>(
      getModelToken(HealthRecord.name),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findOne', () => {
    it('should find and return a specific health record', async () => {
      const id = '65b4c5ead268fd5c84accbf1';
      const expectedRecord = {
        _id: '65b4c5ead268fd5c84accbf1',
        caloriesAmount: 33,
        foodType: 'dd',
        weight: 33,
        height: 33,
        minutesOfExercise: 33,
        amountOfWaterTaken: 33,
        date: new Date('2024-01-27T08:59:22.816+00:00'),
        createdAt: new Date('2024-01-27T08:59:22.817+00:00'),
        updatedAt: new Date('2024-01-27T08:59:22.817+00:00'),
        __v: 0,
      };

      jest.spyOn(healthRecordModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(expectedRecord),
      } as any);

      const result = await healthRecordsService.findOne(id);

      expect(healthRecordModel.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedRecord);
    });
  });

  // Write additional tests for other methods in HealthRecordsService

});