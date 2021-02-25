import { Button } from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";

import FormField from "../components/FormField";
import { useCreatePostMutation } from "../generated/graphql";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [createPost, { loading }] = useCreatePostMutation();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await createPost({
      variables: { input: { title, body } },
    });
    console.log(response);
  };

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
        post
      </Button>
    </form>
  );
};

export default CreatePost;
