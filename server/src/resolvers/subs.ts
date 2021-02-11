import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";

import { Sub } from "../entities/Sub";
import { User } from "../entities/User";
import { Context } from "./types/context";
import { readToken } from "../util/token";
import { subValidator } from "../util/validators";
import { SubInput } from "./types/sub-input";
import { FieldError } from "./types/field-error";

@ObjectType()
class SubResponse {
  @Field(() => Sub, { nullable: true })
  sub?: Sub;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@Resolver()
export class SubResolver {
  @Mutation(() => SubResponse)
  async createSub(
    @Arg("data") data: SubInput,
    @Ctx() { req }: Context
  ): Promise<SubResponse> {
    try {
      const { username } = readToken(req.cookies.token);

      const creator = await User.findOne({ where: { username } });

      const error = subValidator(data);
      if (error) {
        return { error };
      }

      const existingSub = await Sub.findOne({
        where: { name: data.name },
      });

      if (existingSub) {
        return {
          error: {
            field: "name",
            message: "already exists",
          },
        };
      }

      const sub = await Sub.create({ ...data, creator }).save();
      return {
        sub,
      };
    } catch (error) {
      return {
        error: {
          field: "creator",
          message: "unauthenticated",
        },
      };
    }
  }
}
