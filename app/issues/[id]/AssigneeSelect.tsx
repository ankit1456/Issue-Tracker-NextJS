"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  // const { data: users, error, isLoading } = useUsers();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<User[]>("/api/users");
        setUsers(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.message);
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  const assignIssue = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId !== "null" ? userId : null,
      })
      .then(() =>
        toast.success(userId === "null" ? "Issue Unassigned" : "Issue assigned")
      )
      .catch(() => toast.error("Changes could not be saved"));
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "null"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign" />
        <Select.Content position="popper">
          <Select.Group>
            {/* <Select.Label>Suggestions</Select.Label> */}

            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });
export default AssigneeSelect;
