import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { makeid } from "../util/makeid";
import { sluggify } from "../util/sluggify";
import { Comment } from "./Comment";
import { Sub } from "./Sub";

import { User } from "./User";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Field()
  @Column("text", { unique: true })
  identifier: string; // 7 characters

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  body: string;

  @Field()
  @Column("text")
  slug: string;

  @Field(() => Sub)
  @ManyToOne(() => Sub, (sub) => sub.posts, { nullable: false })
  sub: Sub;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  creator: User;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeid(7);
    this.slug = sluggify(this.title);
  }
}
