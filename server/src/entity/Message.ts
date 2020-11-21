import { IsNotEmpty, IsString, Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import Channel from "./Channel";
import User from "./User";


@Entity()
export default class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(2, 40)
    text: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @Column()
    userId: number;

    @Column()
    channelId: number;

    @ManyToOne(() => Channel, channel => channel.messages)
    channel: Channel

    @ManyToOne(() => User, user => user.messages)
    user: User;
}

