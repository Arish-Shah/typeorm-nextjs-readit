import { FormEventHandler, Fragment, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";

const Register = () => {
  const [register, { loading }] = useRegisterMutation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const router = useRouter();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await register({
      variables: {
        input: { email, username, password },
      },
    });

    if (response.data?.register.user?.id) {
      router.push("/");
    }

    if (response.data?.register.errors) {
      setErrors(toErrorMap(response.data.register.errors));
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Register</title>
      </Head>
      <Box mx="auto" w="md" mt="10">
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            label="Email"
            placeholder="email"
            value={email}
            onChange={setEmail}
            required={true}
            id="email"
            error={errors?.email}
          />
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
          <Button type="submit" mt="2" colorScheme="teal" isLoading={loading}>
            register
          </Button>
        </form>
      </Box>
    </Fragment>
  );
};

export default Register;
