import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import bcrypt from "bcryptjs";
import cookie from "cookie";

import { User } from "../entities/User";
import { Context } from "./types/context";
import { registerValidator } from "../util/validators";
import { RegisterInput } from "./types/register-input";
import { createToken, readToken } from "../util/token";
import { FieldError } from "./types/field-error";

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    const token = req.cookies.token;

    if (!token) {
      return null;
    }

    try {
      const { username } = readToken(token);
      const user = User.findOne({ where: { username } });
      return user;
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("data") data: RegisterInput,
    @Ctx() { res }: Context
  ): Promise<UserResponse> {
    const error = registerValidator(data);
    if (error) {
      return { error };
    }

    try {
      const user = await User.create({ ...data }).save();

      const token = createToken(user);

      res.setHeader(
        "Set-Cookie",
        cookie.serialize(process.env.COOKIE_NAME, token, {
          sameSite: "strict",
          secure: false,
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          path: "/",
        })
      );

      return { user };
    } catch (err) {
      if (err.detail.includes("already exists")) {
        return {
          error: {
            field: err.detail.includes("email") ? "email" : "username",
            message: "already exists",
          },
        };
      }
    }
  }

  @Mutation(() => UserResponse, { nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return {
        error: {
          field: "username",
          message: "does not exist",
        },
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        error: {
          field: "password",
          message: "incorrect password",
        },
      };
    }

    const token = createToken(user);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize(process.env.COOKIE_NAME, token, {
        sameSite: "strict",
        secure: false,
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        path: "/",
      })
    );

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { res, req }: Context) {
    if (req.cookies.token) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(process.env.COOKIE_NAME, "", {
          sameSite: "strict",
          secure: false,
          maxAge: -1,
          httpOnly: true,
          path: "/",
        })
      );
      return true;
    }
    return false;
  }
}
