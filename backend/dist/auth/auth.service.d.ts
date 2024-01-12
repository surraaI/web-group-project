import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/createUserDto';
import { HealthRecord } from 'src/health-records/schemas/healthRecord.schema';
import { User } from 'src/users/schemas/user.schema';
import { UpdateUserDto } from 'src/users/dto/updateUserDto';
import { HealthRecordsService } from 'src/health-records/health-records.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private healthRecordsService;
    constructor(usersService: UsersService, jwtService: JwtService, healthRecordsService: HealthRecordsService);
    signUp(createUserDto: CreateUserDto): Promise<{
        token: string;
    }>;
    signIn(email: string, password: string): Promise<{
        token: string;
    }>;
    deleteUser(id: string): Promise<void>;
    deleteAllUsers(): Promise<void>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    getHealthRecordsByUserId(request: Request): Promise<HealthRecord[]>;
    private isValidEmail;
    private isValidPassword;
    findAll(): Promise<User[]>;
    createAdmin(createUserDto: CreateUserDto): Promise<{
        token: string;
    }>;
}
