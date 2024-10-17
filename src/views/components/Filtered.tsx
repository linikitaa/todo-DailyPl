import { Radio, RadioChangeEvent } from "antd";
import { Status } from "../App";

type Props = {
  selectedStatus: Status;
  onStatusChange: (status: Status) => void;
};

export const Filtered = ({ selectedStatus, onStatusChange }: Props) => {
  const handleStatusChange = (e: RadioChangeEvent) => {
    const newStatus = e.target.value as Status;
    onStatusChange(newStatus);
  };

  return (
    <Radio.Group value={selectedStatus} onChange={handleStatusChange}>
      <Radio.Button value="all">All</Radio.Button>
      <Radio.Button value="active">Active</Radio.Button>
      <Radio.Button value="completed">Completed</Radio.Button>
    </Radio.Group>
  );
};
