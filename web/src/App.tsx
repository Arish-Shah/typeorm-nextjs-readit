import { Switch, Route, Redirect } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Posts from "./pages/posts";
import Register from "./pages/register";
import Login from "./pages/login";
import CreatePost from "./pages/create-post";
import EditPost from "./pages/edit-post";

import Navbar from "./components/Navbar";

const App = () => {
  const routes = (
    <Switch>
      <Route path="/posts" component={Posts} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/create-post" component={CreatePost} exact />
      <Route path="/posts/edit/:id" component={EditPost} exact />
      <Redirect to="/posts" />
    </Switch>
  );

  return (
    <Box maxWidth="4xl" mx="auto" p="4">
      <Navbar />
      <Box pt="12" maxWidth="xl" mx="auto">
        {routes}
      </Box>
    </Box>
  );
};

export default App;
