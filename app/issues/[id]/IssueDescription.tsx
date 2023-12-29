"use client";

import { Card, useThemeContext } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDescription = ({ description }: { description: string }) => {
  const { appearance } = useThemeContext();
  return (
    <Card className="prose max-w-3xl" mt="4">
      <div className="-my-4">
        <ReactMarkdown
          className={`${appearance === "dark" && "text-slate-400"}`}
        >
          {description}
        </ReactMarkdown>
      </div>
    </Card>
  );
};

export default IssueDescription;
