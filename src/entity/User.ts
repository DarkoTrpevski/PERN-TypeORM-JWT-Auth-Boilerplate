import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Job } from "./Job";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar" , length: 255})
    name: string;

    @Column({type: "varchar" , length: 255, unique: true})
    email: string;

    @Column({type: "varchar" , length: 255})
    password: string;

    @OneToMany(() => Job, job => job.user)
    jobs: Job[];
}