import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();

  return <Heading>Edit Post: {id}</Heading>;
};

export default EditPost;
