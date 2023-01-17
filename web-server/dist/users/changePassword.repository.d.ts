import { Repository } from 'typeorm';
import { ChangePassword } from './entities/changePassword.entity';
export declare class PasswordRepository extends Repository<ChangePassword> {
    findByUsername(name: string): Promise<ChangePassword>;
}
