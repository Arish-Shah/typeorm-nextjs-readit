import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity("likes")
export class Like extends BaseEntity {
  @PrimaryColumn()
  postID: string;

  @PrimaryColumn()
  creatorID: string;

  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postID" })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: "creatorID" })
  creator: User;
}
