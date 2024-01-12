import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UpdateUserDto } from 'src/users/dto/updateUserDto';
import { HealthRecord } from 'src/health-records/schemas/healthRecord.schema';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<{
        token: string;
    }>;
    signIn(signInDto: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    findAll(): Promise<import("../users/schemas/user.schema").User[]>;
    updateUser(req: any, id: string, updateUserDto: UpdateUserDto): Promise<import("../users/schemas/user.schema").User>;
    deleteUser(req: any, id: string): Promise<void>;
    deleteAll(req: any): Promise<void>;
    createAdmin(createUserDto: CreateUserDto): Promise<{
        token: string;
    }>;
    myHealthRecords(request: any): Promise<HealthRecord[]>;
}
