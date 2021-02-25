import { Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import FormField from "../components/FormField";
import { PostSkeleton } from "../components/Skeleton";
import { usePostQuery } from "../generated/graphql";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = usePostQuery({
    variables: {
      postID: id,
    },
    onCompleted(data) {
      if (data.post) {
        setTitle(data.post.title);
        setBody(data.post.body);
      }
    },
  });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {};

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
        <Button type="submit" colorScheme="teal" isLoading={loading}>
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
