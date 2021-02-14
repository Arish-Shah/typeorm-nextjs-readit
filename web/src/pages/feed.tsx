import { Box, Heading } from "@chakra-ui/react";
import { usePostsQuery } from "../generated/graphql";

const Feed = () => {
  const { data } = usePostsQuery();

  const content = data?.posts ? (
    <Box>
      {data.posts.map((post) => (
        <Box key={post.id}>
          <Heading size="sm">{post.title}</Heading>
        </Box>
      ))}
    </Box>
  ) : null;

  return content;
};

export default Feed;
