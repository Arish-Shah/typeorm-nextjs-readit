import { NexusGenInputs } from "@/generated/nexusTypes";

type RegisterInput = NexusGenInputs["RegisterInput"];

const emailRegex = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
const usernameRegex = /^[A-Za-z0-9_-]+$/;

export const validateRegister = (input: RegisterInput) => {
  if (!emailRegex.test(input.email)) return "invalid email";
  if (!usernameRegex.test(input.username)) return "invalid username";
  if (input.password.length < 3) return "password min 8 characters";
};
