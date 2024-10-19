import s from "./index.module.scss";

import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import dayjs, { Dayjs } from "dayjs";

import { Filtered } from "../components/Filtered.tsx";
import { Tasks } from "../components/Tasks.tsx";
import { Sorted } from "../components/Sorted.tsx";

import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../data/store.ts";
import { addTask, changeStatus, removeTask, updateTitle } from "../components/slice.ts";

export type Status = "all" | "active" | "completed";
export type Task = {
  id: string;
  title: string;
  date: string;
  status: Status;
};

function App() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedStatus, setSelectedStatus] = useState<Status>("all");
  const [title, setTitle] = useState("");

  const tasks = useAppSelector<Task[]>((state) => state.tasks);
  const dispatch: AppDispatch = useDispatch();

  const filteredTasks = selectedStatus === "all" ? tasks : tasks.filter((t) => t.status === selectedStatus);

  const addTaskHandler = () => {
    dispatch(addTask({ title: title, date: selectedDate }));
    setTitle("");
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const removeTaskHandler = (taskId: string) => {
    dispatch(removeTask({ taskId }));
  };

  const onChangeDateHandler = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleStatusChange = (status: Status) => {
    setSelectedStatus(status);
  };

  const toggleTaskStatus = (taskId: string) => {
    dispatch(changeStatus({ taskId }));
  };

  const updateTaskTitle = (taskId: string, newTitle: string) => {
    dispatch(updateTitle({ taskId, newTitle }));
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
            updateTaskTitle={(taskId, newTitle) => updateTaskTitle(taskId, newTitle)}
          />
        </div>
      </main>
    </>
  );
}

export default App;
