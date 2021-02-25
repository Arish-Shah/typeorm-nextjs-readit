import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

import Modal from "./DeletePostDialog";

import { useMeQuery } from "../generated/graphql";
import { Fragment, useState } from "react";

interface PostProps {
  post: any;
}

const PostComponent = ({ post }: PostProps) => {
  const { data } = useMeQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletingPostID, setDeletingPostID] = useState<string | null>(null);

  const handleDeletePost = (ID: string) => {
    setDeletingPostID(ID);
    onOpen();
  };

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        deletingPostID={deletingPostID}
      />
      <LinkBox
        as="article"
        p="5"
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
      >
        <LinkOverlay href={`/post/${post.id}`}></LinkOverlay>
        <Heading fontSize="lg">{post.title}</Heading>
        <Text mt="1">by {post.creator.username}</Text>
        <Text>{post.snippet}...</Text>
        {data?.me?.id === post.creatorId && (
          <Box mt="4">
            <Button as={ReactLink} size="sm" to={`/posts/edit/${post.id}`}>
              <EditIcon />
              <Text ml="2">Edit</Text>
            </Button>
            <Button ml="2" size="sm" onClick={() => handleDeletePost(post.id)}>
              <DeleteIcon />
              <Text ml="2">Delete</Text>
            </Button>
          </Box>
        )}
      </LinkBox>
    </Fragment>
  );
};

export default PostComponent;
