import { PasswordRepository } from './changePassword.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePassword } from './entities/changePassword.entity';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
export declare class UsersService {
    private userRipo;
    private passwordChangeRipo;
    constructor(userRipo: UserRepository, passwordChangeRipo: PasswordRepository);
    create(createUserDto: CreateUserDto): User;
    save(createUserDto: CreateUserDto): Promise<User>;
    findAll(): string;
    findByEmail(email: string): Promise<User>;
    findByUsername(name: string): Promise<User>;
    findUserEmailOrUserName(userenters: {
        username: string;
        email: string;
    }): Promise<CreateUserDto>;
    update(updateUserDto: UpdateUserDto): Promise<UpdateUserDto & User>;
    remove(username: string): string;
    confirmUser(name: string, confirmcode: string): Promise<ChangePassword>;
    getPermissionToChangePassword(name: string): Promise<ChangePassword>;
    deleteExpiration(name: string): Promise<void>;
    sendMail({ user, expireDate }: {
        user: any;
        expireDate: any;
    }): void;
}
