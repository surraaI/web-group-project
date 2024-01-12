import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { Request } from 'express';
import { HealthRecordsService } from './health-records.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('health-records')
export class HealthRecordsController {
  constructor(private readonly healthRecordsService: HealthRecordsService) {}

  @Post('createRecord')
  createRecord(
    @Body() createHealthRecordDto: CreateHealthRecordDto,
    @Req() request: Request,
  ) {
    return this.healthRecordsService.create(createHealthRecordDto, request);
  }
  @UseGuards(AuthGuard)
  @Get('findall')
  findAll() {
    return this.healthRecordsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthRecordsService.findOne(id);
  }
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateHealthRecordDto: UpdateHealthRecordDto,
    @Req() request: Request,
  ) {
    return this.healthRecordsService.update(id, updateHealthRecordDto, request);
}

  // @UseGuards(AuthGuard)
  // @Delete('remove/:id')
  // remove(@Param('id') id: string) {
  //   return this.healthRecordsService.remove(id);
  // }
  @Delete('delete/:id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.healthRecordsService.remove(id, request);
}
}
