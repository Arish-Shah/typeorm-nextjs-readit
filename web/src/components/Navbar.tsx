import { Box, Flex } from "@chakra-ui/layout";

import { useMeQuery } from "~/generated/graphql";

const Navbar = () => {
  const { data, loading } = useMeQuery();

  return (
    <Flex>
      <Box>hello</Box>
    </Flex>
  );
};

export default Navbar;
