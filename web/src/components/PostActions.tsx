import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { Link as ReactLink, useHistory } from "react-router-dom";

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
  const [liked, setLiked] = useState(props.isLiked);
  const history = useHistory();

  const onLike = () => {
    if (data?.me) {
      setLiked((liked) => !liked);
      like({
        variables: {
          postID: props.postID,
        },
      });
    } else {
      history.replace("/login?next=/");
    }
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
          <StarIcon color={liked ? "yellow" : ""} />
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
