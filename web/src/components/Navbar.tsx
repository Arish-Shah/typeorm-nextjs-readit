import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  useMeQuery,
  useLogoutMutation,
  MeQuery,
  MeDocument,
} from "../generated/graphql";

const Navbar = () => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();

  let rightSide = null;

  const handleLogout = () => {
    logout({
      update(cache, { data }) {
        if (data?.logout) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: null,
              __typename: "Query",
            },
          });
        }
      },
    });
  };

  if (!loading) {
    rightSide = data?.me ? (
      <Menu placement="bottom-end" closeOnBlur={true}>
        {({ isOpen }) => (
          <Fragment>
            <MenuButton
              as={Button}
              isActive={isOpen}
              rightIcon={<ChevronDownIcon />}
              colorScheme="teal"
            >
              {data.me!.username}
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/">
                home
              </MenuItem>
              <MenuItem as={Link} to="/create-post">
                create post
              </MenuItem>
              <MenuItem onClick={handleLogout}>logout</MenuItem>
            </MenuList>
          </Fragment>
        )}
      </Menu>
    ) : (
      <Fragment>
        <Button colorScheme="teal" as={Link} to="/register">
          register
        </Button>
        <Button ml="3" as={Link} to="/login">
          login
        </Button>
      </Fragment>
    );
  } else {
    rightSide = (
      <Skeleton>
        <Button>skeleton</Button>
      </Skeleton>
    );
  }

  return (
    <Flex justifyContent="space-between">
      <Heading as={Link} to="/">
        Readit
      </Heading>
      <Box>{rightSide}</Box>
    </Flex>
  );
};

export default Navbar;
