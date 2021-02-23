import { Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Register from "./pages/register";
import Navbar from "./components/Navbar";

const App = () => {
  const routes = (
    <Switch>
      <Route path="/register" component={Register} />
    </Switch>
  );

  return (
    <Box maxWidth="4xl" mx="auto" p="4">
      <Navbar />
      <Box pt="12">{routes}</Box>
    </Box>
  );
};

export default App;
