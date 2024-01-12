import { Role } from 'src/auth/enums/role.enum';
export declare class UpdateUserDto {
    name: string;
    email: string;
    password: string;
    roles?: Role[];
}
