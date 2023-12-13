import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import Link from "@/app/components/Link";
import delay from "delay";
import IssueActions from "./IssueActions";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(1000);
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

export default IssuesPage;
