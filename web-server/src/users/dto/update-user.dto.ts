import { PartialType } from '@nestjs/mapped-types';
import { IsEmail } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name: string;

    password: string;

    firstName: string;

    lastName: string

    @IsEmail()
    email: string;
    
    address: string;

    city: string;

    country: string;

    phone: string;

    expiredPasswordChange: Date;
}
