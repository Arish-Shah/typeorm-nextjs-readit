import { Heading } from "@chakra-ui/react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import Actions from "../components/Actions";
import { PostSkeleton } from "../components/Skeleton";

import { useMeQuery, usePostQuery } from "../generated/graphql";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = usePostQuery({
    variables: {
      postID: id,
    },
  });
  const { data: meData } = useMeQuery();

  if (loading) {
    return PostSkeleton;
  }

  if (!loading && data?.post) {
    return (
      <Fragment>
        <Heading>{data.post.title}</Heading>
        {data.post.creatorId === meData?.me?.id && (
          <Actions postID={data.post.id} />
        )}
      </Fragment>
    );
  }

  return null;
};

export default Post;
