import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { Fragment } from "react";
import { Link as ReactLink } from "react-router-dom";

import DeletePostDialog from "./DeletePostDialog";

interface ActionsProps {
  postID: string;
}

const Actions = (props: ActionsProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Fragment>
      <DeletePostDialog
        isOpen={isOpen}
        onClose={onClose}
        deletingPostID={props.postID}
      />
      <Box mt="4">
        <Button as={ReactLink} size="sm" to={`/posts/edit/${props.postID}`}>
          <EditIcon />
          <Text ml="2">Edit</Text>
        </Button>
        <Button ml="2" size="sm" onClick={onOpen}>
          <DeleteIcon />
          <Text ml="2">Delete</Text>
        </Button>
      </Box>
    </Fragment>
  );
};

export default Actions;
