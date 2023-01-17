import {
    Column,
    Entity,
} from 'typeorm';

@Entity()
export class ChangePassword {
    @Column({
        name: 'userName',
        nullable: false,
        type: 'varchar',
        length: 30,
        default: '',
        primary:true,
    })
    name:string

    @Column({nullable:false})
    confirmcode:string

    @Column({nullable:true, type:Date})
    expiredPasswordChange: Date;
}