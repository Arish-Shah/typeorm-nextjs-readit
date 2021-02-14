import React, { useState, FormEventHandler, Fragment } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";

import InputField from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";

const Login = () => {
  const [login, { loading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const router = useRouter();

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

    if (response.data?.login.user?.id) {
      router.push("/");
    }

    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data.login.errors));
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <Box mx="auto" w="md" mt="6">
        <Heading size="md" mb="5">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            label="Username"
            placeholder="username"
            value={username}
            onChange={setUsername}
            required={true}
            id="username"
            error={errors?.username}
          />
          <InputField
            type="password"
            label="Password"
            placeholder="password"
            value={password}
            onChange={setPassword}
            required={true}
            id="password"
            error={errors?.password}
          />
          <Button
            type="submit"
            mt="2"
            colorScheme="teal"
            mr="3"
            isLoading={loading}
          >
            login
          </Button>
        </form>
      </Box>
    </Fragment>
  );
};

export default Login;
