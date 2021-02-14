import { FormEventHandler, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import InputField from "../components/InputField";
import { useCreatePostMutation } from "../generated/graphql";

const CreatePost = () => {
  document.title = "Login";

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [createPost] = useCreatePostMutation();

  const history = useHistory();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    await createPost({
      variables: {
        input: { title, body },
      },
    });
    history.push("/");
  };

  return (
    <Box width="full" maxWidth="md" mx="auto">
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Title"
          placeholder="title"
          value={title}
          onChange={setTitle}
        />
        <InputField
          type="text"
          label="Body"
          placeholder="text..."
          value={body}
          onChange={setBody}
          textarea
        />
        <Button colorScheme="teal" type="submit">
          add
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;
