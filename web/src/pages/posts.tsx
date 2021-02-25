import { Box, Stack, Text, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

import PostSkeleton from "../components/PostSkeleton";
import Post from "../components/Post";
import { usePostsQuery } from "../generated/graphql";

const Posts = () => {
  const { data, loading } = usePostsQuery();

  if (loading) {
    return <PostSkeleton />;
  }

  if (!loading && data?.posts.length) {
    return (
      <Box>
        <Stack spacing="4">
          {data.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <Text textAlign="center">
      No Posts. To create a post,{" "}
      <Link as={ReactLink} color="teal.200" to="/create-post">
        click here.
      </Link>
    </Text>
  );
};

export default Posts;
