import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity("subs")
export class Sub extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { unique: true })
  name: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column("text", { nullable: true })
  description: string;

  @Field()
  @Column("text", { nullable: true })
  imageUrn: string;

  @Field()
  @Column("text", { nullable: true })
  bannerUrn: string;

  @Field(() => User)
  @ManyToOne(() => User)
  creator: User;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
