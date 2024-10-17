import s from "./index.module.scss";

import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import dayjs, { Dayjs } from "dayjs";

import { ChangeEvent, useState } from "react";

import { Filtered } from "../components/Filtered.tsx";
import { Tasks } from "../components/Tasks.tsx";
import { Sorted } from "../components/Sorted.tsx";

export type Status = "all" | "active" | "completed";
export type Task = {
  id: number;
  title: string;
  date: string;
  status: Status;
};
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

function App() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedStatus, setSelectedStatus] = useState<Status>("all");
  const [task, setTask] = useState<Task[]>([
    { id: 1, status: "active", title: "cook", date: "12/12/2222" },
    { id: 2, status: "active", title: "sport", date: "12/12/2222" },
    { id: 3, status: "completed", title: "less", date: "12/12/2222" },
  ]);
  let [title, setTitle] = useState("");

  const addTaskHandler = () => {
    if (title.trim() !== "" && selectedDate) {
      setTask([
        ...task,
        { id: task.length + 1, title: title, status: "active", date: selectedDate.format("DD/MM/YY") },
      ]);
      setTitle("");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const removeTaskHandler = (taskId: number) => {
    setTask(task.filter((el) => el.id !== taskId));
  };

  const onChangeDateHandler = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleStatusChange = (status: Status) => {
    setSelectedStatus(status);
  };

  const filteredTasks = selectedStatus === "all" ? task : task.filter((t) => t.status === selectedStatus);

  const toggleTaskStatus = (taskId: number) => {
    setTask((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, status: t.status === "active" ? "completed" : "active" } : t)),
    );
  };

  return (
    <>
      <main className={s.todoWrap}>
        <h1 className={s.title}>To do Plan Daily</h1>
        <div className={s.add}>
          <Input style={{ maxWidth: "67%" }} placeholder="Basic usage" value={title} onChange={onChangeHandler} />
          <DatePicker onChange={onChangeDateHandler} defaultValue={dayjs()} format={"DD/MM/YYYY"} />
          <PlusCircleOutlined
            onClick={addTaskHandler}
            style={{ color: "green", fontSize: "30px", cursor: "pointer" }}
          />
        </div>
        <div className={s.filterSort}>
          <Filtered selectedStatus={selectedStatus} onStatusChange={handleStatusChange} />
          <Sorted />
        </div>
        <div className={s.tasks}>
          <Tasks
            filteredTasks={filteredTasks}
            removeTaskHandler={(taskId) => removeTaskHandler(taskId)}
            toggleTaskStatus={(taskId) => toggleTaskStatus(taskId)}
          />
        </div>
      </main>
    </>
  );
}

export default App;
