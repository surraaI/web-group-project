import { Role } from 'src/auth/enums/role.enum';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    roles?: Role[];
}
