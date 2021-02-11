import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { makeid } from "../util/makeid";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity("comments")
export class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Field()
  @Column("text", { unique: true })
  identifier: string;

  @Field()
  @Column()
  body: string;

  @Field(() => User)
  @ManyToOne(() => User)
  creator: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @BeforeInsert()
  makeId() {
    this.identifier = makeid(8);
  }
}
