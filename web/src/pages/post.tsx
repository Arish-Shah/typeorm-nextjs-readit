import { Flex, Heading, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import Actions from "../components/Actions";
import { PostSkeleton } from "../components/Skeleton";

import { useMeQuery, usePostQuery } from "../generated/graphql";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = usePostQuery({
    variables: {
      postID: id,
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
        {data.post.creatorId === meData?.me?.id && (
          <Actions postID={data.post.id} />
        )}
        <Text mt="6">{data.post.body}</Text>
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
