import Select from "antd/lib/select";

export const Sorted = () => {
  return (
    <Select onChange={() => {}} defaultValue={"По возрастанию"}>
      <Select.Option value="top">По возрастанию</Select.Option>
      <Select.Option value="down">По убыванию</Select.Option>
    </Select>
  );
};
