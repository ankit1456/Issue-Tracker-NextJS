"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDeleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} className="!cursor-pointer" color="red">
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>

          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>

          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button className="!cursor-pointer" variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action>
              <Button
                className="!cursor-pointer"
                onClick={handleDeleteIssue}
                color="red"
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>OOPS! Something went wrong</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>

          <Button
            className="!cursor-pointer"
            variant="surface"
            color="violet"
            onClick={() => setError(false)}
            mt="2"
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
