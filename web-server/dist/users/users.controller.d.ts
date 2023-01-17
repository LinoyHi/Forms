import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): string;
    findbyUsername(body: {
        username: string;
        email: string;
        password: string;
    }, session: Record<string, any>): Promise<CreateUserDto>;
    logout(session: Record<string, any>): string;
    returnUser(session: Record<string, any>): any;
    sendMail(userAccess: {
        username: string;
        email: string;
        expiredate: Date;
    }): Promise<void>;
    returnExpirationDate({ userIdentifier, code }: {
        userIdentifier: any;
        code: any;
    }): Promise<Date>;
    update(identifier: string, updateUserDto: UpdateUserDto): Promise<UpdateUserDto & import("./entities/user.entity").User>;
    remove(usernam: string): string;
}
