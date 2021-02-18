import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../entities/User";
import { validateRegister } from "../util/validators";
import { FieldError } from "./types/field-error";
import { RegisterInput } from "./types/register-input";
import { Context } from "./types/context";

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() parent: User, @Ctx() { req }: Context) {
    // @ts-ignore
    if (req.session.userId === parent.id) {
      return parent.email;
    }
    // current user wants to see someone else's email
    return "";
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: Context): Promise<User | null> {
    // @ts-ignore
    const userId = req.session.userId;
    if (userId) {
      return User.findOne(userId);
    }
    return null;
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
            message: "does not exist",
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
            message: "incorrect",
          },
        ],
      };
    }
    // @ts-ignore
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const errors = validateRegister(input);
    if (errors) {
      return {
        errors,
      };
    }

    try {
      const user = await User.create({ ...input }).save();
      // @ts-ignore
      req.session.userId = user.id;

      return {
        user,
      };
    } catch (err) {
      const detail = err.detail as string;
      const field = detail.substring(
        detail.indexOf("(") + 1,
        detail.indexOf(")")
      );
      return {
        errors: [
          {
            field,
            message: "already exists",
          },
        ],
      };
    }
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
