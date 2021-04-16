import { PostResolvers } from "./post";
import { SubResolvers } from "./sub";
import { UserResolvers } from "./user";

export const resolvers = [UserResolvers, SubResolvers, PostResolvers];
