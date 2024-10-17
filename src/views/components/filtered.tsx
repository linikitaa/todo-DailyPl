import { ConfigProviderProps, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import { Status, Task } from "../App";

type SizeType = ConfigProviderProps["componentSize"];

type Props = {
  status: Status;
  onStatusChange: (status: Status) => void;
};
export const Filtered = ({ status, onStatusChange }: Props) => {
  const [size, setSize] = useState<SizeType>("middle");
  const [selectedValue, setSelectedValue] = useState<string>("All");
  const handleStatusChange = (e: RadioChangeEvent) => {
    const newStatus = e.target.value as Status;
    onStatusChange(newStatus);
  };

  return (
    <Radio.Group value={size} onChange={handleStatusChange}>
      <Radio.Button onChange={() => setSelectedValue("All")} n value="All">
        All
      </Radio.Button>
      <Radio.Button onChange={() => setSelectedValue("Active")} value="Active">
        Active
      </Radio.Button>
      <Radio.Button onChange={() => setSelectedValue("Completed")} value="Completed">
        Completed
      </Radio.Button>
    </Radio.Group>
  );
};
