import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Fragment } from "react";

import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";

const Navbar = () => {
  const { data, loading: meLoading } = useMeQuery();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  const handleLogout = () => {
    logout({
      update: (cache, { data }) => {
        if (data?.logout) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: null,
            },
          });
        }
      },
    });
  };

  let content;

  if (meLoading) {
    content = null;
  } else if (data?.me?.id) {
    content = (
      <Fragment>
        <Flex alignItems="center">
          <Text>{data.me.username}</Text>
          <Button ml="5" onClick={handleLogout} isLoading={logoutLoading}>
            logout
          </Button>
        </Flex>
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <NextLink href="/register">
          <Button mr="2" colorScheme="teal">
            register
          </Button>
        </NextLink>
        <NextLink href="/login">
          <Button>login</Button>
        </NextLink>
      </Fragment>
    );
  }

  return (
    <Box boxShadow="sm">
      <Flex p="4" alignItems="center" w="" mx="auto">
        <Box>
          <Heading size="md">
            <NextLink href="/">
              <Link textDecoration="plum">Readit</Link>
            </NextLink>
          </Heading>
        </Box>
        <Spacer />
        <Box>{content}</Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
