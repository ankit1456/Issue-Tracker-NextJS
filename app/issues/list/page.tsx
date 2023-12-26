import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="6">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemsCount={issuesCount}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default IssuesPage;
