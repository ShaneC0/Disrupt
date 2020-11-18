import { IsNotEmpty, IsString, Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import Channel from "./Channel";
import Membership from "./Membership";
import User from "./User";

@Entity()
export default class Server {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    name: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @ManyToOne(() => User, user => user.servers_owned)
    owner: User;

    @Column()
    ownerId: number;

    @OneToMany(() => Channel, channel => channel.server)
    channels: Channel[]

    @OneToMany(() => Membership, membership => membership.server)
    memberships: Membership[]
}

