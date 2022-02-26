import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, IsNull, BeforeInsert } from "typeorm";
import { IsEmail, Length } from 'class-validator';
import bcrypt from 'bcrypt';
import { instanceToPlain, Exclude } from 'class-transformer'

@Entity('users')
export class User extends BaseEntity {

    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user)
    }

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @Index()
    @Length(3, 255, { message: 'username must be atleast 3 characters long' })
    @Column({ unique: true })
    username: string;

    @Exclude()
    @Column()
    @Length(4, 255, { message: 'password must be atleast 4 characters long' })
    password: string;

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }

    toJSON() {
        return instanceToPlain(this)
    }
}
