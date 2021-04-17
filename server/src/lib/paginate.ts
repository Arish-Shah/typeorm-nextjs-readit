import { PaginationInput } from "../types/Input";

export const getPaginationData = (input: PaginationInput) => {
  const data: any = { take: input.take + 1 };

  if (input.cursor) {
    data.cursor = {
      id: input.cursor,
    };
    data.skip = 1;
  }

  return data;
};
