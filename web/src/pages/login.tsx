import { useState, FormEventHandler } from "react";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import FormField from "../components/FormField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import useSearchParams from "../utils/useSearchParams";
import { useIsAuth } from "../utils/useIsAuth";

const Login = () => {
  useIsAuth(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [login, { loading }] = useLoginMutation();
  const history = useHistory();
  const search = useSearchParams();

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await login({
      variables: { username, password },
      update(cache, { data }) {
        if (data?.login.user) {
          // login is successful, update cache
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user,
              __typename: "Query",
            },
          });
        }
        cache.evict({ fieldName: "posts" });
      },
    });
    if (response.data?.login.errors) {
      setErrors({
        username: response.data.login.errors.username || "",
        password: response.data.login.errors.password || "",
      });
    }
    if (response.data?.login.user) {
      const next = search.get("next");
      if (next) {
        history.replace(next);
      } else {
        history.push("/");
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
        login
      </Button>
    </form>
  );
};

export default Login;
