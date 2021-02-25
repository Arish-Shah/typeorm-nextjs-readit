import { Box, Heading, Skeleton, SkeletonText } from "@chakra-ui/react";

const PostSkeleton = () => {
  return (
    <Box p="5" shadow="md" borderWidth="1px" borderRadius="md">
      <Skeleton>
        <Heading>Skeleton</Heading>
      </Skeleton>
      <SkeletonText mt="4"></SkeletonText>
    </Box>
  );
};

export default PostSkeleton;
