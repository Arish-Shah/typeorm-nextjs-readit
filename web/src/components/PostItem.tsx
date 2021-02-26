import { Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

import { useMeQuery } from "../generated/graphql";
import { Fragment } from "react";
import Actions from "./Actions";

interface PostProps {
  post: any;
}

const PostItem = ({ post }: PostProps) => {
  const { data } = useMeQuery();

  return (
    <Fragment>
      <LinkBox
        as="article"
        p="5"
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
      >
        <LinkOverlay as={ReactLink} to={`/post/${post.id}`}></LinkOverlay>
        <Heading fontSize="lg">{post.title}</Heading>
        <Text mt="1">by {post.creator.username}</Text>
        <Text mt="3">{post.snippet}...</Text>
        {data?.me?.id === post.creatorID && (
          <Actions postID={post.id} likes={post.likes} />
        )}
      </LinkBox>
    </Fragment>
  );
};

export default PostItem;
