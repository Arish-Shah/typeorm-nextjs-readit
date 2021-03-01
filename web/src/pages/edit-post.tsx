import { gql } from "@apollo/client";
import { Button, Heading } from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import FormField from "../components/FormField";
import { PostSkeleton } from "../components/Skeleton";
import {
  usePostQuery,
  useEditPostMutation,
  useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";

const EditPost = () => {
  useIsAuth();
  const { postID } = useParams<{ postID: string }>();
  const { data: meData } = useMeQuery();
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

  const history = useHistory();

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await editPost({
      variables: { postID, input: { title, body } },
      update(cache, { data }) {
        if (data?.editPost) {
          const fragment = gql`
            fragment _ on Post {
              id
              title
              snippet
              body
            }
          `;
          cache.writeFragment({
            id: "Post:" + postID,
            fragment: fragment,
            data: { title, snippet: body.substring(0, 50), body },
          });
        }
      },
    });

    if (response.data?.editPost) {
      history.push("/");
    }
  };

  if (loading) {
    return PostSkeleton;
  }

  if (!loading && meData?.me?.id !== data?.post?.creatorID) {
    return (
      <Heading size="md" textAlign="center">
        post not found
      </Heading>
    );
  }

  if (!loading && data?.post) {
    return (
      <form onSubmit={onSubmit}>
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
      post not found
    </Heading>
  );
};

export default EditPost;
