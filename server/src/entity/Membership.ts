import { IsNotEmpty, IsString, Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm";
import Server from "./Server";
import User from "./User";

@Entity()
export default class Membership {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number

    @Column()
    serverId: number

    @ManyToOne(() => User, user => user.memberships)
    user: User

    @ManyToOne(() => Server, server => server.memberships)
    server: Server
}
