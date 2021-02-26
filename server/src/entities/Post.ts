import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  body: string;

  @Field(() => ID)
  @Column()
  creatorID: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "creatorID" })
  creator: User;

  @Field()
  @Column({ default: 0 })
  likes: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
