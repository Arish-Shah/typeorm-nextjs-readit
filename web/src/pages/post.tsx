import { Flex, Heading, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

import { usePostQuery } from "../generated/graphql";
import PostActions from "../components/PostActions";
import { PostSkeleton } from "../components/Skeleton";

const Post = () => {
  const { postID } = useParams<{ postID: string }>();
  const { data, loading } = usePostQuery({
    variables: {
      postID,
    },
  });

  if (loading) {
    return PostSkeleton;
  }

  if (!loading && data?.post) {
    return (
      <Fragment>
        <Heading>{data.post.title}</Heading>
        <Flex justifyContent="space-between" alignItems="center" mt="3">
          <Text as="blockquote">by {data.post.creator.username}</Text>
          <Text>
            Posted at {new Date(data.post.createdAt).toLocaleString()}
          </Text>
        </Flex>
        <PostActions
          postID={data.post.id}
          creatorID={data.post.creatorID}
          likes={data.post.likes}
          isLiked={!!data.post.isLiked}
        />
        <Text mt="4">{data.post.body}</Text>
      </Fragment>
    );
  }

  return (
    <Heading size="md" textAlign="center">
      Post Not Found
    </Heading>
  );
};

export default Post;
