import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

import { useDeletePostMutation } from "../generated/graphql";

interface DeletePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  deletingPostID: string | null;
}

const DeletePostDialog = (props: DeletePostDialogProps) => {
  const cancelRef = useRef(null);

  const [deletePost, { loading }] = useDeletePostMutation();

  const onYesClick = async () => {
    await deletePost({
      variables: {
        postID: props.deletingPostID!,
      },
    });
    props.onClose();
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
      isOpen={props.isOpen}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Delete Post?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete this post. The action cannot be
          undone.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={props.onClose} ref={cancelRef}>
            No
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={onYesClick}
            isLoading={loading}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostDialog;
