import { Button } from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";

import FormField from "../components/FormField";
import { useCreatePostMutation } from "../generated/graphql";
import useIsAuth from "../utils/useIsAuth";

const CreatePost = () => {
  useIsAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [createPost, { loading }] = useCreatePostMutation();

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await createPost({
      variables: { input: { title, body } },
    });
    console.log(response);
  };

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
      <Button type="submit" colorScheme="teal" isLoading={loading}>
        post
      </Button>
    </form>
  );
};

export default CreatePost;
