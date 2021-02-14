import { FormEventHandler, useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import InputField from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";

const Login = () => {
  document.title = "Login";

  const [login, { loading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await login({
      variables: { username, password },
      update: (cache, { data }) => {
        if (data?.login.user) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data.login.user,
            },
          });
        }
      },
    });

    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data.login.errors));
    }
  };

  return (
    <Box width="full" maxWidth="md" mx="auto">
      <form onSubmit={handleSubmit}>
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
          login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
