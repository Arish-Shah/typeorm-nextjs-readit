import { Button } from "@chakra-ui/button";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Flex, Heading, Stack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Skeleton } from "@chakra-ui/skeleton";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { useMeQuery, useLogoutMutation } from "~/generated/graphql";
import UserIcon from "./Icons/UserIcon";

const Navbar = () => {
  const { data, loading, error } = useMeQuery({
    errorPolicy: "all",
  });

  const router = useRouter();

  const [logout] = useLogoutMutation({
    onCompleted() {
      router.reload();
    },
  });

  let rightSide = null;

  if (loading) {
    rightSide = (
      <Stack direction="row">
        <Skeleton w="20"></Skeleton>
        <Skeleton w="20"></Skeleton>
      </Stack>
    );
  } else if (error) {
    rightSide = (
      <Flex>
        <NextLink href="/login" passHref>
          <Button as="a">log in</Button>
        </NextLink>
        <NextLink href="/register" passHref>
          <Button ml="2" as="a" colorScheme="blue">
            sign up
          </Button>
        </NextLink>
        <Menu>
          <MenuButton
            as={Button}
            background="transparent"
            ml="2"
            rightIcon={<ChevronDownIcon />}
          >
            <UserIcon boxSize="6" />
          </MenuButton>
          <MenuList>
            <MenuItem>help</MenuItem>
            <MenuItem>log in/sign up</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  } else if (data?.me?.id) {
    rightSide = (
      <Flex>
        <NextLink href="/submit">
          <Button bg="transparent">
            <EditIcon />
          </Button>
        </NextLink>
        <Menu>
          <MenuButton
            as={Button}
            ml="2"
            textAlign="left"
            rightIcon={<ChevronDownIcon />}
          >
            u/{data.me.username}
          </MenuButton>
          <MenuList>
            <MenuItem>profile</MenuItem>
            <MenuItem>settings</MenuItem>
            <MenuItem>help</MenuItem>
            <MenuItem onClick={() => logout()}>logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  }

  return (
    <Flex
      py="2"
      px="4"
      borderBottom="1px"
      borderBottomColor="gray.600"
      position="fixed"
      left="0"
      top="0"
      width="full"
      justifyContent="space-between"
      bg="gray.800"
    >
      <NextLink href="/" passHref>
        <Flex as="a" alignItems="center" cursor="pointer">
          <CheckCircleIcon boxSize="7" color="orangered" />
          <Heading fontSize="xl" fontWeight="medium" ml="1">
            readit
          </Heading>
        </Flex>
      </NextLink>
      <InputGroup mx="5" maxWidth="650px">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.400" />}
        />
        <Input placeholder="search" />
      </InputGroup>
      {rightSide}
    </Flex>
  );
};

export default Navbar;
