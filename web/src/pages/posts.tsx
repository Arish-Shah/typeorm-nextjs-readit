import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { usePostsQuery } from "../generated/graphql";

const Feed = () => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 5,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const handleLoadMore = () => {
    const cursor = data?.posts.posts[data.posts.posts.length - 1].createdAt;

    fetchMore({
      variables: {
        limit: variables?.limit,
        cursor,
      },
    });
  };

  let content: any = null;

  if (!loading && !data) {
    content = <div>No Posts</div>;
  } else if (loading && !data) {
    content = <div>loading...</div>;
  } else if (data?.posts) {
    content = (
      <Stack spacing="4">
        {data.posts.posts.map((post, index) => (
          <Box p="5" shadow="md" borderWidth="1px" key={index}>
            <Heading fontSize="xl">{post.title}</Heading>
            <Text>posted by {post.creator.username}</Text>
            <Text mt="4">{post.snippet}</Text>
          </Box>
        ))}
        {data && data.posts.hasMore && (
          <Button isLoading={loading} onClick={handleLoadMore}>
            Load More
          </Button>
        )}
      </Stack>
    );
  }

  return (
    <Box width="full" maxW="xl" mx="auto">
      {content}
    </Box>
  );
};

export default Feed;
