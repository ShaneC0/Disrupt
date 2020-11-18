import { IsNotEmpty, IsString, Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import Membership from "./Membership";
import Server from "./Server";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    username: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @OneToMany(() => Server, server => server.owner)
    servers_owned: Server;

    @OneToMany(() => Membership, membership => membership.user)
    memberships: Membership[]

}
