import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { FormControl } from "@chakra-ui/form-control";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { FormEventHandler, Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { MeDocument, MeQuery, useLoginMutation } from "~/generated/graphql";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const [login, { error, loading }] = useLoginMutation({
    errorPolicy: "all",
    update(cache, { data }) {
      cache.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: { ...data.login },
        },
      });
    },
    onCompleted(data) {
      if (data?.login) router.push("/");
    },
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
        <Flex h="full" alignItems="center">
          <Box p="6" w="full" maxW="330px">
            <Heading fontSize="xl" fontWeight="medium" my="3">
              login
            </Heading>
            <Text fontSize="xs">
              By continuing, you agree to our User Agreement and Privacy Policy.
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
                  ref={usernameRef}
                  isInvalid={!!error}
                  required
                />
              </FormControl>
              <FormControl my="3">
                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!error}
                  required
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
      </Flex>
    </Fragment>
  );
};

export default Login;
