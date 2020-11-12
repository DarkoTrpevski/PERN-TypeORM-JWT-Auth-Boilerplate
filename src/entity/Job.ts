import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("jobs")
export class Job {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type: "varchar" , length: 255})
  title: string;
  
  @Column({type: "varchar" , length: 255})
  location: string;
  
  @Column({type: "varchar" , length: 255})
  companyName: string;
  
  @Column({type: "varchar" , length: 255})
  postedAt: string;

  // @Column()
  // @CreateDateColumn()
  // created_at: Date;
  
  @Column({type: "text"})
  description: string;

  @ManyToOne(() => User, user => user.jobs, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User;
}