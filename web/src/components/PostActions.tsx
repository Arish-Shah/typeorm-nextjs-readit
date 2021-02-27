import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { Fragment } from "react";
import { Link as ReactLink } from "react-router-dom";

import DeletePostDialog from "./DeletePostDialog";
import { useLikeMutation, useMeQuery } from "../generated/graphql";

interface PostActionsProps {
  postID: string;
  likes: number;
  isLiked: boolean;
  creatorID: string;
}

const PostActions = (props: PostActionsProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data } = useMeQuery();
  const [like] = useLikeMutation();

  const onLike = () => {
    like({
      variables: {
        postID: props.postID,
      },
    });
  };

  return (
    <Fragment>
      <DeletePostDialog
        isOpen={isOpen}
        onClose={onClose}
        deletingPostID={props.postID}
      />
      <Box mt="4">
        <Button size="sm" onClick={onLike}>
          <StarIcon color={props.isLiked ? "yellow" : ""} />
          <Text ml="3">{props.likes}</Text>
        </Button>
        {data?.me?.id === props.creatorID && (
          <Button
            as={ReactLink}
            ml="2"
            size="sm"
            to={`/post/edit/${props.postID}`}
          >
            <EditIcon />
            <Text ml="2">Edit</Text>
          </Button>
        )}
        {data?.me?.id === props.creatorID && (
          <Button ml="2" size="sm" onClick={onOpen}>
            <DeleteIcon />
            <Text ml="2">Delete</Text>
          </Button>
        )}
      </Box>
    </Fragment>
  );
};

export default PostActions;
