import { enumType } from "nexus";

export const PostType = enumType({
  name: "PostType",
  members: ["TEXT", "LINK", "IMAGE"],
});
