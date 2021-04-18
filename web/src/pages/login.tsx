import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { FormEventHandler, Fragment, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";

import withApollo from "~/lib/apollo";
import { useLoginMutation } from "~/generated/graphql";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Alert, AlertIcon } from "@chakra-ui/alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { error, loading }] = useLoginMutation({
    errorPolicy: "all",
    update() {},
    onCompleted() {},
  });

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    login({
      variables: { username, password },
    });
  };

  return (
    <Fragment>
      <Head>
        <title>readit: log in</title>
      </Head>
      <Flex height="100vh">
        <Box
          w="9%"
          bg="url('/side.png') no-repeat"
          backgroundSize="cover"
        ></Box>
        <Box>
          <Flex h="full" alignItems="center">
            <Box p="6" w="full" maxW="330px">
              <Heading fontSize="xl" fontWeight="medium" my="3">
                login
              </Heading>
              <Text fontSize="xs">
                By continuing, you agree to our User Agreement and Privacy
                Policy.
              </Text>
              <Box as="form" my="5" onSubmit={onSubmit}>
                {error && (
                  <Alert status="error" mb="5">
                    <AlertIcon />
                    {error?.message}
                  </Alert>
                )}
                <FormControl my="3">
                  <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!error}
                  />
                </FormControl>
                <FormControl my="3">
                  <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!error}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  w="full"
                  isLoading={loading}
                >
                  log in
                </Button>
              </Box>
              <Text fontSize="xs">
                new to readit?{" "}
                <NextLink href="/register">
                  <Link color="blue.200" fontWeight="medium">
                    sign up
                  </Link>
                </NextLink>
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default withApollo({ ssr: false })(Login);
