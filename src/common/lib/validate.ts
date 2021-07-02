import { NexusGenInputs } from "@/generated/nexus-types";

export const emailRegex = /^[^\s@]+@[^\s@]+$/;

export const validateRegister = (input: NexusGenInputs["RegisterInput"]) => {
  if (!emailRegex.test(input.email)) return "invalid email";
  if (input.name.length < 1) return "name is required";
  if (input.password.length < 8) return "password must be min 8 characters";
};
