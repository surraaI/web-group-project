import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HealthRecord,
  HealthRecordSchema,
} from '../health-records/schemas/healthRecord.schema';
import { User, userSchema } from '../users/schemas/user.schema';
import { HealthRecordsModule } from '../health-records/health-records.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    UsersModule,
    HealthRecordsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24hr' },
    }),

    MongooseModule.forFeature([
      { name: HealthRecord.name, schema: HealthRecordSchema },
      { name: User.name, schema: userSchema },
    ]),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
