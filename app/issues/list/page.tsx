import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import ReactMarkdown from "react-markdown";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden sm:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden sm:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="ml-auto block sm:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Flex>
              </Table.Cell>

              <Table.Cell className="hidden sm:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default IssuesPage;