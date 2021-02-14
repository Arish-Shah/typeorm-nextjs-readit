import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import {
  useMeQuery,
  useLogoutMutation,
  MeDocument,
  MeQuery,
} from "../generated/graphql";

const Navbar = () => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout({
      update: (cache, { data }) => {
        if (data?.logout) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: null,
            },
          });
        }
      },
    });
  };

  let body;

  if (loading) {
    // do nothing
  } else if (data?.me) {
    body = (
      <Flex alignItems="center">
        <Text>{data.me.username}</Text>
        <Button
          variant="link"
          ml="3"
          colorScheme="blue"
          size="sm"
          onClick={handleLogout}
        >
          logout
        </Button>
      </Flex>
    );
  } else {
    body = (
      <Box>
        <Link to="/register">
          <Button mr="2" colorScheme="teal">
            register
          </Button>
        </Link>
        <Link to="/login">
          <Button>login</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      px="4"
      py="2"
      borderBottom="2px"
      borderColor="gray.700"
    >
      <Box>
        <Link to="/">
          <Heading>Readit</Heading>
        </Link>
      </Box>
      {body}
    </Flex>
  );
};

export default Navbar;
