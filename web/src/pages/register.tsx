import { useState, FormEventHandler } from "react";
import { Box, Button } from "@chakra-ui/react";

import FormField from "../components/FormField";
import { useRegisterMutation } from "../generated/graphql";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [register, { loading }] = useRegisterMutation();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await register({
      variables: {
        input: { email, username, password },
      },
    });
    if (response.data?.register.errors) {
      setErrors({
        email: response.data.register.errors.email!,
        username: response.data.register.errors.username!,
        password: response.data.register.errors.password!,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxWidth="xl" mx="auto">
      <FormField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
      <FormField
        id="username"
        label="Username"
        type="text"
        value={username}
        onChange={setUsername}
        error={errors.username}
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />
      <Button colorScheme="teal" type="submit" isLoading={loading}>
        register
      </Button>
    </Box>
  );
};

export default Register;
