import { EntityRepository, Repository } from 'typeorm';
import { ChangePassword } from './entities/changePassword.entity';

@EntityRepository(ChangePassword)
export class PasswordRepository extends Repository<ChangePassword> {
    findByUsername(name: string) {
        return this.findOne({ name });
    }
}