import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="9">
      <Box>
        <Heading>{issue.title}</Heading>

        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>

        <Card className="prose" mt="4">
          <div className="-my-4">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </div>
        </Card>
      </Box>

      <Box>
        <Button>
          {" "}
          <Pencil2Icon />{" "}
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
