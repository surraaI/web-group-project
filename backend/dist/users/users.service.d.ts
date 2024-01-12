/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUserDto';
import { Role } from 'src/auth/enums/role.enum';
import { UpdateUserDto } from './dto/updateUserDto';
import { HealthRecord } from 'src/health-records/schemas/healthRecord.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto, roles?: Role[]): Promise<User>;
    findOne(email: string): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    deleteUser(id: string): Promise<void>;
    deleteAll(): Promise<void>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    createAdmin(createUserDto: CreateUserDto): Promise<User>;
    addHealthRecordToUser(userId: string, healthRecord: HealthRecord): Promise<void>;
    getRecordsByUserId(request: any): Promise<HealthRecord[]>;
    private extractTokenFromRequest;
    private extractUserIdFromToken;
}
