import { FormEventHandler, useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import InputField from "../components/InputField";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";

const Register = () => {
  document.title = "Register";

  const [register, { loading }] = useRegisterMutation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await register({
      variables: {
        input: { email, username, password },
      },
      update: (cache, { data }) => {
        if (data?.register.user) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data.register.user,
            },
          });
        }
      },
    });

    if (response.data?.register.errors) {
      setErrors(toErrorMap(response.data.register.errors));
    }
  };

  return (
    <Box width="full" maxWidth="md" mx="auto">
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          label="Email"
          placeholder="email"
          value={email}
          onChange={setEmail}
          error={errors?.email}
        />
        <InputField
          type="text"
          label="Username"
          placeholder="username"
          value={username}
          onChange={setUsername}
          error={errors?.username}
        />
        <InputField
          type="password"
          label="Password"
          placeholder="password"
          value={password}
          onChange={setPassword}
          error={errors?.password}
        />
        <Button colorScheme="teal" type="submit" isLoading={loading}>
          register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
