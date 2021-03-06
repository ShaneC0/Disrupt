import { IsNotEmpty, IsString, Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import Message from "./Message";
import Server from "./Server";
import User from "./User";

@Entity()
export default class Channel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    name: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @ManyToOne(() => Server, server => server.channels)
    server: Server

    @Column()
    serverId: number;

    @OneToMany(() => Message, message => message.channel)
    messages: Message[]

}

