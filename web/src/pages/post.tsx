import { Flex, Heading, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

import { useMeQuery, usePostQuery } from "../generated/graphql";
import Actions from "../components/Actions";
import { PostSkeleton } from "../components/Skeleton";

const Post = () => {
  const { postID } = useParams<{ postID: string }>();
  const { data, loading } = usePostQuery({
    variables: {
      postID,
    },
  });
  const { data: meData } = useMeQuery();

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
        {data.post.creatorID === meData?.me?.id && (
          <Actions postID={data.post.id} likes={data.post.likes} />
        )}
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
