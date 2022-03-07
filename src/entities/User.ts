import { Entity as TOEntity, Column, Index, BeforeInsert, OneToMany } from "typeorm";
import { IsEmail, Length } from 'class-validator';
import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer'
import Entity from "./Entity";
import { Post } from "./Post";
import Vote from "./Votes";


@TOEntity('users')
export default class User extends Entity {

    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user)
    }

    @Index()
    @IsEmail(undefined, { message: 'Must be a valid email' })
    @Length(1, 255, { message: 'Email is empty' })
    @Column({ unique: true })
    email: string;

    @Index()
    @Length(3, 255, { message: 'Must be atleast 3 characters long' })
    @Column({ unique: true })
    username: string;

    @Exclude()
    @Column()
    @Length(4, 255, { message: 'Must be atleast 4 characters long' })
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[]

    @OneToMany(() => Vote, vote => vote.user)
    votes: Vote[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }
}
