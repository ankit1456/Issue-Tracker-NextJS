import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueFormSkeleton = async () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" className="mb-2" />
      <Skeleton height="23rem" />
      <Skeleton width="9rem" className="mt-10" height="2rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
