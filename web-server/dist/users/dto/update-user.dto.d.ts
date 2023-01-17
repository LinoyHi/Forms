import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    expiredPasswordChange: Date;
}
export {};
