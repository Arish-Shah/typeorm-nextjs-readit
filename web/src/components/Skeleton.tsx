import { Box, Heading, Skeleton, SkeletonText } from "@chakra-ui/react";
import { Fragment } from "react";

export const PostsSkeleton = (
  <Box p="5" shadow="md" borderWidth="1px" borderRadius="md">
    <Skeleton>
      <Heading>Skeleton</Heading>
    </Skeleton>
    <SkeletonText mt="4"></SkeletonText>
  </Box>
);

export const PostSkeleton = (
  <Fragment>
    <Skeleton>
      <Heading>Skeleton</Heading>
    </Skeleton>
    <SkeletonText mt="4"></SkeletonText>
  </Fragment>
);
