import {
  Resolver,
  Query,
  Mutation,
  ObjectType,
  Field,
  Arg,
  Ctx,
} from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../entities/User";
import { FieldError } from "./types/field-error";
import { RegisterInput } from "./types/input";
import { registerValidator } from "../utils/validators";
import { Context } from "./types/context";

@ObjectType()
class UserResponse {
  @Field({ nullable: true })
  user?: User;

  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: Context) {
    // @ts-ignore
    const { userID } = req.session;
    if (!userID) {
      return null;
    }
    return User.findOne(userID);
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return {
        errors: {
          username: "not found",
        },
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        errors: {
          password: "incorrect",
        },
      };
    }

    // @ts-ignore
    req.session.userID = user.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const errors = registerValidator(input);
    if (errors) {
      return {
        errors,
      };
    }
    try {
      const user = await User.create({ ...input }).save();
      // @ts-ignore
      req.session.userID = user.id;
      return { user };
    } catch (err) {
      const detail = err.detail as string;
      const key = detail.substring(
        detail.indexOf("(") + 1,
        detail.indexOf(")")
      );
      return {
        errors: {
          [key]: "already exists",
        },
      };
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context): Promise<boolean> {
    return new Promise((resolve) => {
      return req.session.destroy((err) => {
        if (err) {
          resolve(false);
        }
        res.clearCookie(process.env.COOKIE_NAME!);
        resolve(true);
      });
    });
  }
}
