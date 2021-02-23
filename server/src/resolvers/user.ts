import { Resolver, Query } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query()
  hello(): string {
    return "Hello World";
  }
}
