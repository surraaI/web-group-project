import { Module } from '@nestjs/common';
import { HealthRecordsController } from './health-records.controller';
import {
  HealthRecord,
  HealthRecordSchema,
} from './schemas/healthRecord.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { User, userSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/roles.guard';
import { HealthRecordsService } from './health-records.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HealthRecord.name, schema: HealthRecordSchema },
      { name: User.name, schema: userSchema },
    ]),
    UsersModule, // Import the UserModule (or the module where the User model is defined)
  ],
  controllers: [HealthRecordsController],
  providers: [
    HealthRecordsService,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [HealthRecordsService],
})
export class HealthRecordsModule {}
