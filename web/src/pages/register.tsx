import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { FormControl } from "@chakra-ui/form-control";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { FormEventHandler, Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { MeDocument, MeQuery, useRegisterMutation } from "~/generated/graphql";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const [register, { error, loading }] = useRegisterMutation({
    errorPolicy: "all",
    update(cache, { data }) {
      cache.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: { ...data.register },
        },
      });
    },
    onCompleted(data) {
      if (data?.register) router.push("/");
    },
  });

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    register({
      variables: { input: { email, username, password } },
    });
  };

  return (
    <Fragment>
      <Head>
        <title>readit: join the worldwide conversation</title>
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
              sign up
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
                  type="email"
                  placeholder="email"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!error}
                  required
                />
              </FormControl>
              <FormControl my="3">
                <Input
                  type="text"
                  placeholder="choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                continue
              </Button>
            </Box>
            <Text fontSize="xs">
              already a readitor?{" "}
              <NextLink href="/login">
                <Link color="blue.200" fontWeight="medium">
                  log in
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
