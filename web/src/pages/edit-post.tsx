import { Button, Heading } from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import { useParams } from "react-router-dom";

import FormField from "../components/FormField";
import { PostSkeleton } from "../components/Skeleton";
import { usePostQuery, useEditPostMutation } from "../generated/graphql";

const EditPost = () => {
  const { postID } = useParams<{ postID: string }>();
  const { data, loading } = usePostQuery({
    variables: {
      postID,
    },
    onCompleted(data) {
      if (data.post) {
        setTitle(data.post.title);
        setBody(data.post.body);
      }
    },
  });
  const [editPost, { loading: editLoading }] = useEditPostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await editPost({
      variables: { postID, input: { title, body } },
    });
    console.log(response);
  };

  if (loading) {
    return PostSkeleton;
  }

  if (!loading && data?.post) {
    return (
      <form onSubmit={handleSubmit}>
        <FormField
          id="title"
          type="text"
          label="Title"
          value={title}
          onChange={setTitle}
        />
        <FormField
          id="body"
          type="text"
          label="Body"
          value={body}
          onChange={setBody}
          isTextarea={true}
        />
        <Button type="submit" colorScheme="teal" isLoading={editLoading}>
          update post
        </Button>
      </form>
    );
  }

  return (
    <Heading size="md" textAlign="center">
      Post Not Found
    </Heading>
  );
};

export default EditPost;
