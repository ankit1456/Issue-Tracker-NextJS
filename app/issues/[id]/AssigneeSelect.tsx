"use client";

import { Select } from "@radix-ui/themes";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign" />
      <Select.Content>
        <Select.Group>
          {/* <Select.Label>Suggestions</Select.Label> */}
          <Select.Item value="1">Ankit</Select.Item>
          <Select.Item value="2">Amit</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
