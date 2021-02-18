import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

// many to many
// user <-> post

@Entity("upvotes")
export class Upvote extends BaseEntity {
  @Column({ type: "int" })
  value: number; // 1, 0, -1

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @PrimaryColumn()
  postId: string;

  @ManyToOne(() => Post, (post) => post.upvotes)
  post: Post;
}
