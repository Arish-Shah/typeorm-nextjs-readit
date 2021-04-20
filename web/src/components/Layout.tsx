import { Fragment } from "react";
import { Flex } from "@chakra-ui/layout";

import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <Flex mt="14">{children}</Flex>
    </Fragment>
  );
};

export default Layout;
