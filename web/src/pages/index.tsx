import { Box, Button, Flex, Heading, Link, Spacer } from "@chakra-ui/react";
import { Fragment } from "react";
import Head from "next/head";
import Anchor from "next/link";

const Index = () => {
  return (
    <Fragment>
      <Head>
        <title>Readit</title>
      </Head>
      <Box boxShadow="sm">
        <Flex p="4" alignItems="center" w="container.lg" mx="auto">
          <Box>
            <Heading size="md">
              <Anchor href="/">
                <Link textDecoration="plum">Readit</Link>
              </Anchor>
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Anchor href="/register">
              <Button mr="2" colorScheme="teal">
                register
              </Button>
            </Anchor>
            <Anchor href="/login">
              <Button>login</Button>
            </Anchor>
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
};

export default Index;
