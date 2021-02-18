import { FormEventHandler, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import InputField from "../components/InputField";
import { useCreatePostMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";

const CreatePost = () => {
  document.title = "Login";

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const [createPost] = useCreatePostMutation();

  const history = useHistory();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await createPost({
      variables: {
        input: { title, body },
      },
      update: (cache) => {
        cache.modify({
          fields: {
            posts(_, { INVALIDATE }) {
              return INVALIDATE;
            },
          },
        });
      },
    });

    if (response.data?.createPost.errors) {
      setErrors(toErrorMap(response.data.createPost.errors));
    }
    if (response.data?.createPost.post) {
      history.push("/");
    }
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
          error={errors?.title}
        />
        <InputField
          type="text"
          label="Body"
          placeholder="text..."
          value={body}
          onChange={setBody}
          textarea
          error={errors?.body}
        />
        <Button colorScheme="teal" type="submit">
          add
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;
