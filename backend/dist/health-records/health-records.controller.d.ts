import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { Request } from 'express';
import { HealthRecordsService } from './health-records.service';
export declare class HealthRecordsController {
    private readonly healthRecordsService;
    constructor(healthRecordsService: HealthRecordsService);
    createRecord(createHealthRecordDto: CreateHealthRecordDto, request: Request): Promise<import("./schemas/healthRecord.schema").HealthRecord>;
    findAll(): Promise<import("./schemas/healthRecord.schema").HealthRecord[]>;
    findOne(id: string): Promise<import("./schemas/healthRecord.schema").HealthRecord>;
    update(id: string, updateHealthRecordDto: UpdateHealthRecordDto): Promise<import("./schemas/healthRecord.schema").HealthRecord>;
    remove(id: string): Promise<import("./schemas/healthRecord.schema").HealthRecord>;
}
