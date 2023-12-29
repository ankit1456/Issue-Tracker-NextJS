import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Flex, Heading, Text } from "@radix-ui/themes";
import IssueDescription from "./IssueDescription";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>

      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <IssueDescription description={issue.description} />
    </>
  );
};

export default IssueDetails;
