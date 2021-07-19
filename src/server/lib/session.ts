import { AuthenticationError } from "apollo-server-micro";
import { getSession, GetSessionOptions } from "next-auth/client";

export const getSessionOrThrow = async (options?: GetSessionOptions) => {
  const session = await getSession(options);
  if (!session) {
    throw new AuthenticationError("unauthenticated");
  }
  return session;
};
