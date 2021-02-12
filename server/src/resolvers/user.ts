import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { User } from "../entities/User";
import { registerValidator } from "../util/validators";
import { Context } from "./types/context";
import { RegisterInput } from "./types/register-input";
import { UserResponse } from "./types/user-response";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context) {
    const userId = req.session.userId;
    if (userId) {
      const user = await User.findOne(userId);
      return user;
    }
    return null;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    try {
      const errors = registerValidator(input);
      if (errors) {
        return { errors };
      }
      const user = await User.create({ ...input }).save();

      req.session.userId = user.id;

      return { user };
    } catch (err) {
      if (err.detail.includes("already exists")) {
        const detail = err.detail as string;
        const field = detail.substring(
          detail.indexOf("(") + 1,
          detail.indexOf(")")
        );
        const message = field + " already exists";
        return {
          errors: [
            {
              field,
              message,
            },
          ],
        };
      }
    }
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
        errors: [
          {
            field: "username",
            message: "username not found",
          },
        ],
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    (req.session as any).userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context): Promise<boolean> {
    return new Promise((resolve) => {
      return req.session.destroy((err) => {
        if (err) {
          return resolve(false);
        }
        res.clearCookie(process.env.COOKIE_NAME);
        return resolve(true);
      });
    });
  }
}
