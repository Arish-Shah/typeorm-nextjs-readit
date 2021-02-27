import { Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

import { Fragment } from "react";
import PostActions from "./PostActions";

interface PostProps {
  post: any;
}

const PostItem = ({ post }: PostProps) => {
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
        <PostActions
          postID={post.id}
          creatorID={post.creatorID}
          likes={post.likes}
          isLiked={post.isLiked}
        />
      </LinkBox>
    </Fragment>
  );
};

export default PostItem;
