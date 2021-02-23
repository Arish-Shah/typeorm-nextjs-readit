import {
  Resolver,
  Query,
  Mutation,
  ObjectType,
  Field,
  Arg,
} from "type-graphql";

import { User } from "../entities/User";
import { FieldError } from "./types/field-error";
import { RegisterInput } from "./types/input";
import { registerValidator } from "../util/validators";

@ObjectType()
class UserResponse {
  @Field({ nullable: true })
  user?: User;

  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;
}

@Resolver()
export class UserResolver {
  @Query()
  hello(): string {
    return "Hello World";
  }

  @Mutation(() => UserResponse)
  async register(@Arg("input") input: RegisterInput): Promise<UserResponse> {
    const errors = registerValidator(input);
    if (errors) {
      return {
        errors,
      };
    }

    try {
      const user = await User.create({ ...input }).save();
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
}
