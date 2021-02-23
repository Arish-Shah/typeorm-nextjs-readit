import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex justifyContent="space-between">
      <Heading>Readit</Heading>
      <Box>
        <Button colorScheme="teal" as={Link} to="/register">
          register
        </Button>
        <Button ml="3" as={Link} to="/login">
          login
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
