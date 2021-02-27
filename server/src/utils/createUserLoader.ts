import DataLoader from "dataloader";

import { User } from "../entities/User";

export const createUserLoader = () =>
  new DataLoader<string, User>(async (keys) => {
    const users = await User.findByIds(keys as any);
    const userIDToUser: Record<string, User> = {};

    users.forEach((user) => {
      userIDToUser[user.id] = user;
    });

    return keys.map((key) => userIDToUser[key]);
  });
